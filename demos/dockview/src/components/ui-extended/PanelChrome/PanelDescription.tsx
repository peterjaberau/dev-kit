import { chakra, Icon } from '@chakra-ui/react';
import { Tooltip } from '@dev-kit/components';
import { FaCircle as CircleIcon } from "react-icons/fa";

import { TitleItem } from './TitleItem';

interface Props {
  description: string | (() => string);
  className?: string;
  css?: any
}

export function PanelDescription({ description, className, css }: Props) {

  const getDescriptionContent: any = () => {
    // description
    const panelDescription = typeof description === 'function' ? description() : description;

    return (
      <chakra.div className="panel-info-content markdown-html">
        <chakra.div dangerouslySetInnerHTML={{ __html: panelDescription }} />
      </chakra.div>
    );
  };

  return description !== '' ? (
    <Tooltip interactive content={getDescriptionContent}>
      <TitleItem
        css={{
          whiteSpace: 'normal',
          wordWrap: 'break-word',
        }}
       >
        <Icon size='md'>
          <CircleIcon />
        </Icon>
      </TitleItem>
    </Tooltip>
  ) : null;
}

