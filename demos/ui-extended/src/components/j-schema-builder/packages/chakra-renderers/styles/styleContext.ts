

import React, { useContext } from 'react';
import { StyleDef, vanillaStyles } from './styles';

export interface StyleContext {
  styles: StyleDef[];
}

const defaultContext: StyleContext = {
  styles: vanillaStyles,
};

export const JsonFormsStyleContext = React.createContext(defaultContext);

export const useStyleContext = (): StyleContext =>
  useContext(JsonFormsStyleContext);

export const useStyles = (): StyleDef[] => {
  const { styles } = useStyleContext();
  return styles;
};
