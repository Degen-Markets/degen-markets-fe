import { ReelOption, Ticker } from "@/app/lib/utils/bets/types";
import { useState } from "react";

type ReelProps<T> = {
  reelOptions: ReelOption<T>[];
};

const Reel = <T,>({ reelOptions }: ReelProps<T>) => {
  const [selectedOption, setSelectedOption] = useState<ReelOption<T>>(
    reelOptions[0],
  );
  const optionIndex = reelOptions.findIndex(
    (option) => option.key === selectedOption.key,
  );
  const isStartOption = optionIndex === 0;
  const isEndOption = optionIndex === reelOptions.length - 1;

  const optionsToDisplay = (() => {
    if (isStartOption) {
      return [
        reelOptions[reelOptions.length - 1],
        selectedOption,
        reelOptions[1],
      ];
    }
    if (isEndOption) {
      return [
        reelOptions[reelOptions.length - 2],
        selectedOption,
        reelOptions[0],
      ];
    }
    return reelOptions.slice(optionIndex - 1, optionIndex + 2);
  })();

  const handleOptionBack = () => {
    if (isStartOption) {
      return setSelectedOption(reelOptions[reelOptions.length - 1]);
    }
    return setSelectedOption(reelOptions[optionIndex - 1]);
  };

  const handleOptionForward = () => {
    if (isEndOption) {
      return setSelectedOption(reelOptions[0]);
    }
    return setSelectedOption(reelOptions[optionIndex + 1]);
  };

  return (
    <div>
      <div onClick={handleOptionBack}>BACK</div>
      {optionsToDisplay.map((option) => (
        <div key={option.key}>{option.key}</div>
      ))}
      <div onClick={handleOptionForward}>FORWARD</div>
    </div>
  );
};

export default Reel;
