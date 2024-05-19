import React, { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ReelOption } from "@/app/lib/utils/bets/types";

interface TokenSearchProps<T> {
  searchOption: ReelOption<T>[];
  selectedOption: ReelOption<T>;
  setSelectedOption: Dispatch<SetStateAction<ReelOption<T>>>;
  title: string;
  placeHolder: string;

  // isRandom: boolean
  // setIsRandom: React.Dispatch<React.SetStateAction<boolean>>
}

const TokenSearch = <T,>({
  searchOption,
  selectedOption,
  setSelectedOption,
  title,
  placeHolder,
  // isRandom,
  // setIsRandom
}: TokenSearchProps<T>) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredTokens, setFilteredTokens] = useState(searchOption);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = React.useRef<HTMLUListElement>(null);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setInputValue(value);
  //   setIsRandom(false)
  //   console.log({
  //     isRandom, value, inputValue
  //   })
  //   setFilteredTokens(
  //     searchOption.filter(token =>
  //       token.label.toLowerCase().includes(value.toLowerCase())
  //     )
  //   );
  //   setShowDropdown(true);
  // };

  const handleTokenSelect = (token: ReelOption<T>) => {
    setInputValue(token.label);
    setSelectedOption(token);
    setShowDropdown(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
      // setIsRandom(false)
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-fit">
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #8d68e6;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: #f1f1f1;
          border-radius: 4px;
        }
      `}</style>
      <h4 className="pt-3 text-left whitespace-nowrap">{title}</h4>
      <input
        type="text"
        value={selectedOption.label}
        // onChange={handleInputChange}
        onFocus={() => setShowDropdown(!showDropdown)}
        className="px-4 py-2 ring-purple-medium  text-[#000] uppercase w-fit"
        placeholder={`${placeHolder}...`}
      />
      {showDropdown && (
        <ul
          ref={dropdownRef}
          className="absolute w-full bg-white border  mt-1 max-h-60 overflow-y-auto z-10 custom-scrollbar"
        >
          {filteredTokens.map((token, index) => (
            <li
              key={index}
              onClick={() => handleTokenSelect(token)}
              className={`px-4 py-2 cursor-pointer ${selectedOption.label === token.label ? "text-[#fff] bg-blue-dark" : "text-[#000] hover:bg-gray-200"}`}
            >
              {token.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TokenSearch;
