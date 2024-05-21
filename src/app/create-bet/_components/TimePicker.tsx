import React, { ChangeEvent, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ReelOption } from "@/app/lib/utils/bets/types";
import { useBetContext } from "../BetContext";
import {
  getCurrentDateTime,
  getTimeDifferenceInSeconds,
} from "@/app/lib/utils/bets/helpers";

interface TokenSearchProps<T> {
  title: string;
  placeHolder: string;
}

const TimePicker = <T,>({ title, placeHolder }: TokenSearchProps<T>) => {
  const { customDuration, setCustomDuration } = useBetContext();
  const [time, setTime] = useState<string>("");

  React.useEffect(() => {
    setTime(customDuration.label);
  }, [customDuration]);

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTime = event.target.value.trim();
    const inputTimeWOT = event.target.value;
    console.log({
      inputTimeWithTrim: inputTime,
      inputTimeWOT,
    });
    setTime(inputTime);
    const unixTime = getTimeDifferenceInSeconds(inputTime);
    setCustomDuration({
      label: inputTime,
      value: unixTime,
    });
  };

  const validateTime = () => {
    const timeDifference = getTimeDifferenceInSeconds(time);
    if (timeDifference < 86400) {
      // 86400 seconds = 1 day
      return "Bet must last at least 1 day";
    }
    return "";
  };

  const errorMessage = validateTime();

  return (
    <div className="flex justify-start items-center">
      <div>
        <h4 className="pt-3 text-left whitespace-nowrap">{title}</h4>

        <input
          type="datetime-local"
          id="appt"
          name="appt"
          value={time}
          onChange={handleTimeChange}
          min={getCurrentDateTime()} // disabling the past Date
          className={`styled-time-input w-full sm:w-fit p-2  ${time === "" ? "text-gray-500" : "text-[#000]"} bg-gray-50 border border-gray-300 sm:text-2xl focus:outline-none focus:ring-2 focus:ring-purple-medium focus:border-purple-medium focus-visible:outline-none ${errorMessage && "border border-red-500"}`}
          placeholder={placeHolder}
        />
        {errorMessage && (
          <p className="text-red-500 sm:text-xl text-left">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default TimePicker;
