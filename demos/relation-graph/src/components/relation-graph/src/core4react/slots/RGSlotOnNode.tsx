import React, {useContext} from 'react';
import {RelationGraphStoreContext} from "#components";

const RGSlotOnNode: React.FC = ({ children }: any) => {
  const graphInstance = useContext(RelationGraphStoreContext);
  if (!graphInstance) {
    return null;
  }
  return <>{children}</>;
};
export default RGSlotOnNode;
