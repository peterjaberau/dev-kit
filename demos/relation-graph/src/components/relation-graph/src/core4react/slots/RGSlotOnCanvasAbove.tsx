
import React, {useContext} from 'react';
import {RelationGraphStoreContext} from "#components";

const RGSlotOnCanvasAbove: React.FC = ({ children }: any) => {
  const graphInstance = useContext(RelationGraphStoreContext);
  if (!graphInstance) {
    return null;
  }
  return <>{children}</>;
};
export default RGSlotOnCanvasAbove;
