

import has from 'lodash/has';
import {
  AndCondition,
  Condition,
  LeafCondition,
  OrCondition,
  RuleEffect,
  SchemaBasedCondition,
  Scopable,
  UISchemaElement,
  ValidateFunctionCondition,
} from '../models';
import { resolveData } from './resolvers';
import type Ajv from 'ajv';
import { composeWithUi } from './uischema';

const isOrCondition = (condition: Condition): condition is OrCondition =>
  condition.type === 'OR';

const isAndCondition = (condition: Condition): condition is AndCondition =>
  condition.type === 'AND';

const isLeafCondition = (condition: Condition): condition is LeafCondition =>
  condition.type === 'LEAF';

const isSchemaCondition = (
  condition: Condition
): condition is SchemaBasedCondition => has(condition, 'schema');

const isValidateFunctionCondition = (
  condition: Condition
): condition is ValidateFunctionCondition =>
  has(condition, 'validate') &&
  typeof (condition as ValidateFunctionCondition).validate === 'function';

const getConditionScope = (condition: Scopable, path: string): string => {
  return composeWithUi(condition, path);
};

const evaluateCondition = (
  data: any,
  uischema: UISchemaElement,
  condition: Condition,
  path: string,
  ajv: Ajv,
  config: unknown
): boolean => {
  if (isAndCondition(condition)) {
    return condition.conditions.reduce(
      (acc, cur) =>
        acc && evaluateCondition(data, uischema, cur, path, ajv, config),
      true
    );
  } else if (isOrCondition(condition)) {
    return condition.conditions.reduce(
      (acc, cur) =>
        acc || evaluateCondition(data, uischema, cur, path, ajv, config),
      false
    );
  } else if (isLeafCondition(condition)) {
    const value = resolveData(data, getConditionScope(condition, path));
    return value === condition.expectedValue;
  } else if (isSchemaCondition(condition)) {
    const value = resolveData(data, getConditionScope(condition, path));
    if (condition.failWhenUndefined && value === undefined) {
      return false;
    }
    return ajv.validate(condition.schema, value) as boolean;
  } else if (isValidateFunctionCondition(condition)) {
    const value = resolveData(data, getConditionScope(condition, path));
    const context = {
      data: value,
      fullData: data,
      path,
      uischemaElement: uischema,
      config,
    };
    return condition.validate(context);
  } else {
    // unknown condition
    return true;
  }
};

const isRuleFulfilled = (
  uischema: UISchemaElement | any,
  data: any,
  path: string,
  ajv: Ajv,
  config: unknown
): boolean => {
  const condition = uischema.rule.condition;
  return evaluateCondition(data, uischema, condition, path, ajv, config);
};

export const evalVisibility = (
  uischema: UISchemaElement | any,
  data: any,
  path: string = undefined as any,
  ajv: Ajv,
  config: unknown
): boolean => {
  const fulfilled = isRuleFulfilled(uischema, data, path, ajv, config);

  switch (uischema.rule.effect as any) {
    case RuleEffect.HIDE:
      return !fulfilled;
    case RuleEffect.SHOW:
      return fulfilled;
    // visible by default
    default:
      return true;
  }
};

export const evalEnablement = (
  uischema: UISchemaElement | any,
  data: any,
  path: string = undefined as any,
  ajv: Ajv,
  config: unknown
): boolean => {
  const fulfilled = isRuleFulfilled(uischema, data, path, ajv, config);

  switch (uischema.rule.effect) {
    case RuleEffect.DISABLE:
      return !fulfilled;
    case RuleEffect.ENABLE:
      return fulfilled;
    // enabled by default
    default:
      return true;
  }
};

export const hasShowRule = (uischema: UISchemaElement): boolean => {
  if (
    uischema.rule &&
    (uischema.rule.effect === RuleEffect.SHOW ||
      uischema.rule.effect === RuleEffect.HIDE)
  ) {
    return true;
  }
  return false;
};

export const hasEnableRule = (uischema: UISchemaElement): boolean => {
  if (
    uischema.rule &&
    (uischema.rule.effect === RuleEffect.ENABLE ||
      uischema.rule.effect === RuleEffect.DISABLE)
  ) {
    return true;
  }
  return false;
};

export const isVisible = (
  uischema: UISchemaElement,
  data: any,
  path: string = undefined as any,
  ajv: Ajv,
  config?: unknown | any
): boolean => {
  if (uischema.rule) {
    return evalVisibility(uischema, data, path, ajv, config);
  }

  return true;
};

export const isEnabled = (
  uischema: UISchemaElement,
  data: any,
  path: string = undefined as any,
  ajv: Ajv,
  config: unknown
): boolean => {
  if (uischema.rule) {
    return evalEnablement(uischema, data, path, ajv, config);
  }

  return true;
};
