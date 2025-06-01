import Input from './Input';
import AuthLabel from './AuthLabel';

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
