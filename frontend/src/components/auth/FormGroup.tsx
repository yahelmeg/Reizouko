import Input from '../general/Input.tsx';
import AuthLabel from './AuthLabel.tsx';
import React from 'react';

interface formGroupProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const FormGroup: React.FC<formGroupProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="pb-4">
      <AuthLabel label={label} />
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormGroup;
