import { ChangeEvent } from "react";
import { useBetContext } from "../create-bet/BetContext";
import Input from "@/app/components/Input";

interface BetAmountProps<T> {
  title: string;
  placeHolder: string;
  disabled?: boolean;
}

export default function BetAmount<T>({
  title,
  placeHolder,
  disabled,
}: BetAmountProps<T>) {
  const { value, setValue } = useBetContext();

  const handleValueInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const decimals = newValue.split(/\,|\./)[1];
    if (!decimals || decimals.length < 7) {
      setValue(newValue);
    }
  };

  return (
    <div className="relative w-full">
      <Input
        label={`${title}:`}
        value={value}
        onChange={handleValueInput}
        type="number"
        step=".000001"
        lang="en-US"
        className="w-full text-black-main text-lg"
        placeholder={placeHolder}
        disabled={disabled}
      />
    </div>
  );
}
