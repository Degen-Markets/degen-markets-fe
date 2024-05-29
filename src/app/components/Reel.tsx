import { ReelOption } from "@/app/lib/utils/bets/types";
import { Dispatch, SetStateAction } from "react";
import { MdArrowBackIos } from "react-icons/md";

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
    <div className="relative ">
      <div className="absolute -top-12 lg:-top-14 text-sm md:text-lg lg:px-2 bg-prussian-dark pt-3 pb-3 border-purple-medium border-2  whitespace-nowrap w-full">
        {title}
      </div>
      <div
        className="border border-prussian-dark py-2 text-sm md:text-lg text-center bg-white text-blue-dark "
        style={{
          background:
            "linear-gradient(to bottom, #999 0%, #e8e8e8 15%, #ffffff 50%, #e8e8e8 85%, #999 100%)",
        }}
      >
        <div
          className="cursor-pointer flex justify-center "
          onClick={handleOptionBack}
        >
          <MdArrowBackIos className="rotate-90 text-lg lg:text-4xl" />
        </div>
        {optionsToDisplay.map((option, index) => (
          // key for small options (Up/Down) has to be the index to avoid key conflict
          <div
            key={reelOptions.length >= 3 ? option.label : index}
            className={`text-sm lg:text-2xl ${index !== 1 && "text-slate-400"}`}
          >
            {option.label}
          </div>
        ))}
        <div
          className="cursor-pointer flex justify-center "
          onClick={handleOptionForward}
        >
          <MdArrowBackIos className=" -rotate-90 text-lg lg:text-4xl" />
        </div>
      </div>
    </div>
  );
};

export default Reel;
