import React, { FC } from 'react';



interface FBCheckboxProps {
  onChangeValue: (_arg0: { [key: string]: any }) => void;
  isChecked: boolean;
  id?: string;
  label?: string;
  use?: string;
  value?: string;
  disabled?: boolean;
  dataTest?: string;
  labelClassName?: string;
}

const FBCheckbox: FC<FBCheckboxProps> = ({
  onChangeValue,
  value = '',
  isChecked = false,
  label = '',
  use = 'action',
  disabled = false,
  id = '',
  dataTest = '',
  labelClassName = '',
}) => {

  const potentialCheckboxId = id !== '' ? id : label;
  const checkboxId =
    potentialCheckboxId !== '' ? potentialCheckboxId : undefined;
  return (
    <div data-test='checkbox' >
      <input
        type='checkbox'
        id={checkboxId}
        data-test={dataTest || undefined}
        onChange={(event) => {
          if (!disabled) {
            onChangeValue(event);
          }
        }}
        value={value}
        disabled={disabled}
        checked={isChecked}
      />
      <div className='checkbox-overlay'>
        {label && (
          <label htmlFor={checkboxId} className={labelClassName || undefined}>
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default FBCheckbox;
