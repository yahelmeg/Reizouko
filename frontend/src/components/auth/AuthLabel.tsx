import React from 'react';

interface LabelProps {
  label: string;
}

const AuthLabel: React.FC<LabelProps> = ({ label }: LabelProps) => {
  return (
    <label className="text-sm font-medium text-gray-700 mb-2 block">
      {label}
    </label>
  );
};

export default AuthLabel;
