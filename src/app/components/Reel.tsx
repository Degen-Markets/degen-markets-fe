import { ReelOption } from "@/app/lib/utils/bets/types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { MdArrowBackIos } from "react-icons/md";

type ReelProps<T> = {
  reelOptions: ReelOption<T>[];
  title: string;
  selectedOption: ReelOption<T>;
  setSelectedOption: Dispatch<SetStateAction<ReelOption<T>>>;
  isMetric?: boolean;
};

const Reel = <T,>({
  reelOptions,
  title,
  selectedOption,
  setSelectedOption,
  isMetric = false,
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
      <div className="absolute -top-10 lg:-top-12 text-sm md:text-lg lg:px-2 bg-prussian-dark py-1 border-purple-medium border-2  whitespace-nowrap w-full">
        {title}
      </div>
      <div
        className="border border-prussian-dark py-2 text-sm md:text-lg text-center h-full flex flex-col justify-between items-center bg-white text-blue-dark "
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
        {optionsToDisplay.map((option, index) => {
          const hasImage = !!option.image;
          const isSelected = index !== 1;
          // key for small options (Up/Down) has to be the index to avoid key conflict
          return (
            <div
              key={reelOptions.length >= 3 ? option.label : index}
              className="flex justify-center items-center"
            >
              <div
                className={`text-sm lg:text-2xl  ${hasImage && !isMetric && "flex justify-center lg:grid lg:grid-cols-2 lg:items-center lg:justify-start lg:justify-items-center lg:gap-2 w-20"}  ${isSelected && "text-slate-400"}`}
                title={option.label}
              >
                {hasImage && !isMetric && (
                  <div className="w-6 h-6 rounded-full p-1 lg:p-0 ">
                    <Image
                      src={option.image as string}
                      alt={option.label}
                      width={24}
                      height={24}
                      className={`${isSelected ? "filter grayscale" : "filter-none"} rounded-full`}
                      sizes="(max-width: 640px) 18px, (max-width: 768px) 32px, 40px"
                    />
                  </div>
                )}

                <p
                  className={`${
                    hasImage && !isMetric && "lg:block hidden"
                  } whitespace-nowrap`}
                >
                  {option.label}
                </p>
              </div>
            </div>
          );
        })}
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
