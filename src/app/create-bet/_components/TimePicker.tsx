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
  const { customDuration, setCustomDuration, error, setError, validateFields } =
    useBetContext();
  const [time, setTime] = useState<string>("");

  React.useEffect(() => {
    setTime(customDuration.label);
  }, [customDuration]);

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTime = event.target.value.trim();
    if (inputTime === "" || inputTime === getCurrentDateTime()) {
      setError("Invalid time: Cannot be empty or now.");
    } else {
      setTime(inputTime);
      const unixTime = getTimeDifferenceInSeconds(inputTime);
      setCustomDuration({
        label: inputTime,
        value: BigInt(unixTime),
      });
      setError("");
      validateFields();
    }
  };

  return (
    <div className="relative w-full">
      <label className="text-left whitespace-nowrap font-bold">{title}</label>
      <input
        type="datetime-local"
        id="appt"
        name="appt"
        value={time}
        onChange={handleTimeChange}
        min={getCurrentDateTime()}
        className={`styled-time-input w-full rounded-md p-2 ${time === "" ? "text-gray-500" : "text-[#000]"} text-sm sm:text-2xl focus:outline-none focus:ring-2 focus:ring-purple-medium focus:border-purple-medium focus-visible:outline-none`}
        placeholder={placeHolder}
        disabled={disabled}
      />
    </div>
  );
};

export default TimePicker;
