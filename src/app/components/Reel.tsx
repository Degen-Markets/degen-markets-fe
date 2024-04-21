import { ReelOption } from "@/app/lib/utils/bets/types";
import { useState, RefObject, Dispatch, SetStateAction } from "react";

type ReelProps<T> = {
  reelOptions: ReelOption<T>[];
  title: string;
  selectedOption: ReelOption<T>;
  setSelectedOption: Dispatch<SetStateAction<ReelOption<T>>>;
};

const Reel = <T,>({
  reelOptions,
  title,
  selectedOption,
  setSelectedOption,
}: ReelProps<T>) => {
  const optionIndex = reelOptions.findIndex(
    (option) => option.label === selectedOption.label,
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
      <div>{title}</div>
      <div onClick={handleOptionBack}>BACK</div>
      {optionsToDisplay.map((option, index) => (
        // key for small options (Up/Down) has to be the index to avoid key conflict
        <div key={reelOptions.length >= 3 ? option.label : index}>
          {option.label}
        </div>
      ))}
      <div onClick={handleOptionForward}>FORWARD</div>
    </div>
  );
};

export default Reel;
