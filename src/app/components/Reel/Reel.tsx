import { ReelOption } from "@/app/lib/utils/bets/types";
import styles from "./reel.module.css";
import { Dispatch, SetStateAction } from "react";

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
      <span className="p-[10px] bg-blue-dark pt-3 pb-3 border-yellow-dark border-2">
        {title}
      </span>
      <div className="border border-blue-dark pt-[10px] text-lg text-center bg-white text-blue-dark">
        <div className="cursor-pointer" onClick={handleOptionBack}>
          &#9650;
        </div>
        {optionsToDisplay.map((option, index) => (
          // key for small options (Up/Down) has to be the index to avoid key conflict
          <div
            key={reelOptions.length >= 3 ? option.label : index}
            className={`${index !== 1 && "text-slate-400"}`}
          >
            {option.label}
          </div>
        ))}
        <div className="cursor-pointer" onClick={handleOptionForward}>
          &#9660;
        </div>
      </div>
    </div>
  );
};

export default Reel;
