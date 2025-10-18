import React, { useState } from 'react';
import { Input } from '@chakra-ui/react';
import FBCheckbox from '../checkbox/FBCheckbox';
import { getRandomId } from '../utils';
import { PlaceholderInput } from '../inputs/PlaceholderInput';

// specify the inputs required for a string type object
const CardLongAnswerParameterInputs: any = ({
  parameters,
  onChange,
}: any) => {
  const [elementId] = useState(getRandomId());
  return (
    <div>
      <h4>Minimum Length</h4>
      <Input
        value={parameters.minLength ? parameters.minLength : ''}
        placeholder='Minimum Length'
        key='minLength'
        type='number'
        onChange={(ev) => {
          onChange({
            ...parameters,
            minLength: parseInt(ev.target.value, 10),
          });
        }}
      />
      <h4>Maximum Length</h4>
      <Input
        value={parameters.maxLength ? parameters.maxLength : ''}
        placeholder='Maximum Length'
        key='maxLength'
        type='number'
        onChange={(ev) => {
          onChange({
            ...parameters,
            maxLength: parseInt(ev.target.value, 10),
          });
        }}
      />
      <h4>
        Regular Expression Pattern{' '}
        {/*<a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions'>*/}
        {/*  <Tooltip*/}
        {/*    id={`${elementId}_regex`}*/}
        {/*    type='help'*/}
        {/*    text='Regular expression pattern that this must satisfy'*/}
        {/*  />*/}
        {/*</a>*/}
      </h4>
      <Input
        value={parameters.pattern ? parameters.pattern : ''}
        placeholder='Regular Expression Pattern'
        key='pattern'
        type='text'
        onChange={(ev) => {
          onChange({
            ...parameters,
            pattern: ev.target.value,
          });
        }}
        className='card-modal-text'
      />
      <PlaceholderInput parameters={parameters} onChange={onChange} />
      <div className='card-modal-boolean'>
        <FBCheckbox
          onChangeValue={() => {
            onChange({
              ...parameters,
              'ui:autofocus': parameters['ui:autofocus']
                ? parameters['ui:autofocus'] !== true
                : true,
            });
          }}
          isChecked={
            parameters['ui:autofocus']
              ? parameters['ui:autofocus'] === true
              : false
          }
          label='Auto Focus'
        />
      </div>
    </div>
  );
};

const LongAnswer: any = ({ parameters, onChange }: any) => {
  return (
    <React.Fragment>
      <h5>Default value</h5>
      <Input
        value={
          parameters.default as string | number | readonly string[] | undefined
        }
        placeholder='Default'
        type='textarea'
        onChange={(ev) => onChange({ ...parameters, default: ev.target.value })}
        className='card-textarea'
      />
    </React.Fragment>
  );
};

const longAnswerInput: any = {
  longAnswer: {
    displayName: 'Long Answer',
    matchIf: [
      {
        types: ['string'],
        widget: 'textarea',
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {
      'ui:widget': 'textarea',
    },
    type: 'string',
    cardBody: LongAnswer,
    modalBody: CardLongAnswerParameterInputs as any,
  },
};

export default longAnswerInput;
