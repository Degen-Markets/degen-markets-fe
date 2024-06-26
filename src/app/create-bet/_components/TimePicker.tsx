import React, { ChangeEvent, useState } from "react";
import { useBetContext } from "../BetContext";
import {
  getCurrentDateTime,
  getTimeDifferenceInSeconds,
} from "@/app/lib/utils/bets/helpers";

interface TokenSearchProps<T> {
  title: string;
  placeHolder: string;
  disabled?: boolean;
}

const TimePicker = <T,>({
  title,
  placeHolder,
  disabled,
}: TokenSearchProps<T>) => {
  const { customDuration, setCustomDuration } = useBetContext();
  const [time, setTime] = useState<string>("");

  React.useEffect(() => {
    setTime(customDuration.label);
  }, [customDuration]);

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTime = event.target.value.trim();
    setTime(inputTime);
    const unixTime = getTimeDifferenceInSeconds(inputTime);
    setCustomDuration({
      label: inputTime,
      value: unixTime,
    });
  };

  return (
    <div className="flex flex-col">
      <h4 className="pt-3 text-left whitespace-nowrap">{title}</h4>
      <input
        type="datetime-local"
        id="appt"
        name="appt"
        value={time}
        onChange={handleTimeChange}
        min={getCurrentDateTime()} // disabling the past Date
        className={`styled-time-input p-[0.4rem]  ${time === "" ? "text-gray-500" : "text-[#000]"}  text-sm sm:text-2xl focus:outline-none focus:ring-2 focus:ring-purple-medium focus:border-purple-medium focus-visible:outline-none`}
        placeholder={placeHolder}
        disabled={disabled}
      />
    </div>
  );
};

export default TimePicker;
