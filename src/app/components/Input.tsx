import { FC, ChangeEvent } from "react";

interface InputProps {
  label?: string;
  disabled?: boolean;
  value: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  step?: string;
  lang?: string;
}

const Input: FC<InputProps> = ({
  label,
  disabled = false,
  value,
  placeholder = "",
  onChange,
  type = "text",
  className = "",
  step,
  lang,
}) => (
  <div className="flex flex-col">
    {label && (
      <label className="text-left whitespace-nowrap font-bold">{label}</label>
    )}
    <input
      disabled={disabled}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      className={`p-3 ring-purple-medium text-black-medium uppercase rounded-md ${className}`}
      step={step}
      lang={lang}
    />
  </div>
);

export default Input;
