import React, { useState } from "react"
import { Select, createListCollection, Portal } from "@chakra-ui/react"
import { PlaceholderInput } from '../inputs/PlaceholderInput';

export const CardReferenceParameterInputs: any = ({
  parameters,
  onChange,
}: any) => {
  return (
    <div>
      <PlaceholderInput parameters={parameters} onChange={onChange} />
    </div>
  );
};

const RefChoice: any = ({ parameters, onChange }: any) => {
  const [value, setValue] = useState<any>(null)

  const collectionOptions = createListCollection({
    items:  Object.keys(parameters.definitionData || {}).map((key) => ({
      value: `#/definitions/${key}`,
      label:
        parameters.definitionData![key].title || `#/definitions/${key}`,
    }))
  })

  const pathArr = (parameters.$ref || '').split('/');
  const currentValueLabel =
    pathArr.length === 3 &&
    pathArr[0] === '#' &&
    pathArr[1] === 'definitions' &&
    (parameters.definitionData || {})[pathArr[2]]
      ? parameters.definitionData![pathArr[2]].title || parameters.$ref
      : parameters.$ref;

  return (
    <div className='card-select'>
      <Select.Root
        collection={collectionOptions}
        value={[value]}
        onValueChange={(e) => setValue(e.value?.length > 0 ? e.value[0] : null)}
        // onChange={(val: any) => {
        //   onChange({ ...parameters, $ref: val.value });
        // }}
        className='card-select'
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Reference" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {collectionOptions.items.map((option) => (
                <Select.Item item={option} key={option.value}>
                  {option.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>


      </Select.Root>
    </div>
  );
};

const referenceInputs: any = {
  ref: {
    displayName: 'Reference',
    matchIf: [
      {
        types: ['null'],
        $ref: true,
      },
    ],
    defaultDataSchema: {
      $ref: '',
      title: '',
      description: '',
    },
    defaultUiSchema: {},
    type: 'string',
    cardBody: RefChoice,
    modalBody: CardReferenceParameterInputs,
  },
};

export default referenceInputs;
