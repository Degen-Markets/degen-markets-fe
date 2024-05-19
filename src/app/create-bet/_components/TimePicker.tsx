import React, { ChangeEvent, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ReelOption } from "@/app/lib/utils/bets/types";
import { useBetContext } from "../BetContext";

function getTimeDifferenceInSeconds(customDateTimeString: string): number {
  const currentTime = Math.floor(Date.now() / 1000);
  const customDateTime = new Date(customDateTimeString);
  const customUnixTimestamp = Math.floor(customDateTime.getTime() / 1000);
  const timeDifferenceInSeconds = customUnixTimestamp - currentTime;
  return timeDifferenceInSeconds;
}

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
    const inputTime = event.target.value;
    setTime(inputTime);
    const unixTime = getTimeDifferenceInSeconds(inputTime);
    setCustomDuration({
      label: inputTime,
      value: unixTime,
    });

    console.log({
      time,
      unixTime,
    });
  };

  // Getting the current date and time in the format to Disable the past date
  const getCurrentDateTime = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  const validateTime = () => {
    const timeDifference = getTimeDifferenceInSeconds(time);
    if (timeDifference < 86400) {
      // 86400 seconds = 1 day
      return "At least one day ahead is required.";
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
          <p className="text-red-500 sm:text-xl">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default TimePicker;
