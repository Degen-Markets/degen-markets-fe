import { ChangeEvent } from "react";
import { useBetContext } from "../create-bet/BetContext";

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
    <div className="flex flex-col">
      <h4 className="pt-3 text-left whitespace-nowrap">{title}:</h4>
      <input
        value={value}
        onChange={handleValueInput}
        type="number"
        lang="en-US"
        step=".000001"
        className="p-2 sring-purple-medium text-black uppercase"
        placeholder={placeHolder}
        disabled={disabled}
      />
    </div>
  );
}
