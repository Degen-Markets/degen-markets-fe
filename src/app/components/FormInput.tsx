import { ChangeEvent, FC, Ref, memo } from "react";

interface FormInputProps {
  label: string;
  value: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  ref?: Ref<HTMLInputElement>;
}

const FormInput: FC<FormInputProps> = memo(
  ({ label, value, disabled = false, placeholder = "", onChange, ref }) => (
    <div className="relative">
      <h4 className="pt-3 text-left whitespace-nowrap">{label}</h4>
      <input
        disabled={disabled}
        value={value}
        onChange={onChange}
        className="px-2 sm:px-4 py-2 ring-purple-medium text-[#000] uppercase"
        placeholder={placeholder}
        ref={ref}
      />
    </div>
  ),
);

FormInput.displayName = "FormInput";

export default FormInput;
