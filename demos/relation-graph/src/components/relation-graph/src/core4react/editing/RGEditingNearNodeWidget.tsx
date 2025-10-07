import React from 'react';
import {RGWidgetPosition, RGWidgetProps} from '#models-core/types';

const RGEditingNearNodeWidget: React.FC<RGWidgetProps> = ({ position, children }: any) => {
  const _position: RGWidgetPosition = position || 'top';
  return (
    <div
      className={`rel-editing-bar rel-editing-bar-${_position}`}
    >
      {children}
    </div>
  );
};

export default RGEditingNearNodeWidget;
