import { useState, useEffect, useRef, useCallback } from "react";
import { Dispatch, SetStateAction } from "react";
import { ReelOption } from "@/app/lib/utils/bets/types";
import { debounce } from "@/app/lib/utils/bets/helpers";
import Image from "next/image";

interface DropdownProps<T> {
  searchOption: ReelOption<T>[];
  selectedOption: ReelOption<T>;
  setSelectedOption: Dispatch<SetStateAction<ReelOption<T>>>;
  title: string;
  placeHolder: string;
  isSearchable?: boolean;
  disabled?: boolean;

  setIsPrettySearchOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function Dropdown<T>({
  searchOption,
  selectedOption,
  setSelectedOption,
  title,
  placeHolder,
  isSearchable = false,
  disabled,
  setIsPrettySearchOpen,
}: DropdownProps<T>) {
  const [filteredTokens, setFilteredTokens] = useState(searchOption);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleInputChange = () => {
    const value = inputRef.current?.value.trim() || "";
    setFilteredTokens(
      searchOption.filter((token) =>
        token.label.toLowerCase().includes(value.toLowerCase()),
      ),
    );
    setShowDropdown(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleInputChange = useCallback(
    debounce(handleInputChange, 400),
    [searchOption],
  );

  const handleTokenSelect = (token: ReelOption<T>) => {
    if (inputRef.current) {
      inputRef.current.value = token.label;
    }
    setSelectedOption(token);
    setShowDropdown(false);
    setIsPrettySearchOpen?.(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = selectedOption.label;
    }
  }, [selectedOption]);

  return (
    <div className="relative w-full">
      {title && (
        <label className="text-left font-bold whitespace-nowrap">{title}</label>
      )}
      <div className="relative w-full ">
        {selectedOption.image && (
          <Image
            src={selectedOption.image as string}
            alt={selectedOption.label}
            width={24}
            height={24}
            className="absolute top-1/2 transform -translate-y-1/2 left-2"
          />
        )}
        <input
          ref={inputRef}
          type="text"
          readOnly={!isSearchable}
          defaultValue={selectedOption.label}
          onChange={isSearchable ? debouncedHandleInputChange : undefined}
          onFocus={() => setShowDropdown(true)}
          className={`p-3 ring-purple-medium text-[#000] uppercase w-full text-lg rounded-md ${
            selectedOption.image ? "pl-10 sm:pl-12" : "pl-2 sm:pl-4"
          }`}
          placeholder={`${placeHolder}...`}
          disabled={disabled}
        />
      </div>
      {showDropdown && (
        <ul
          ref={dropdownRef}
          className="absolute w-full bg-white border mt-1 max-h-60 overflow-y-auto z-10 custom-scrollbar"
        >
          {filteredTokens.length > 0 ? (
            filteredTokens.map((token) => {
              const hasImage = !!token.image;

              return (
                <li
                  key={token.label}
                  onClick={() => handleTokenSelect(token)}
                  className={`px-4 py-2 cursor-pointer outline-none  outline-0 border-none flex justify-start ${
                    selectedOption.label === token.label
                      ? "text-[#fff] bg-blue-dark"
                      : "text-[#000] hover:bg-gray-200"
                  }`}
                >
                  <div
                    className={`text-sm lg:text-2xl  ${
                      hasImage &&
                      "justify-center grid grid-cols-2 items-center  w-14 md:w-20"
                    }`}
                  >
                    {hasImage && (
                      <div className="w-6 h-6 rounded-full p-1 lg:p-0">
                        <Image
                          src={token.image as string}
                          alt={token.label}
                          width={24}
                          height={24}
                          sizes="(max-width: 640px) 18px, (max-width: 768px) 32px, 40px"
                        />
                      </div>
                    )}
                    <p className="whitespace-nowrap">{token.label}</p>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="px-4 py-2 cursor-not-allowed text-[#000]">
              Not Found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
