import { useState, useEffect, useRef, useCallback } from "react";
import { Dispatch, SetStateAction } from "react";
import { ReelOption } from "@/app/lib/utils/bets/types";
import { debounce } from "@/app/lib/utils/bets/helpers";

interface DropdownProps<T> {
  searchOption: ReelOption<T>[];
  selectedOption: ReelOption<T>;
  setSelectedOption: Dispatch<SetStateAction<ReelOption<T>>>;
  title: string;
  placeHolder: string;
  isSearchable?: boolean;
  disabled?: boolean;
}

export default function Dropdown<T>({
  searchOption,
  selectedOption,
  setSelectedOption,
  title,
  placeHolder,
  isSearchable = false,
  disabled,
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
    <div className="flex flex-col">
      <h4 className="pt-3 text-left whitespace-nowrap">{title}</h4>
      <input
        ref={inputRef}
        type="text"
        readOnly={!isSearchable}
        defaultValue={selectedOption.label}
        onChange={isSearchable ? debouncedHandleInputChange : undefined}
        onFocus={() => setShowDropdown(true)}
        className="p-2 ring-purple-medium text-[#000] uppercase"
        placeholder={`${placeHolder}...`}
        disabled={disabled}
      />
      {showDropdown && (
        <ul
          ref={dropdownRef}
          className="absolute bg-white border mt-1 max-h-60 overflow-y-auto z-10 custom-scrollbar"
        >
          {filteredTokens.length > 0 ? (
            filteredTokens.map((token) => (
              <li
                key={token.label}
                onClick={() => handleTokenSelect(token)}
                className={`p-2 cursor-pointer outline-0 border-none ${
                  selectedOption.label === token.label
                    ? "text-[#fff] bg-blue-dark"
                    : "text-[#000] hover:bg-gray-200"
                }`}
              >
                {token.label}
              </li>
            ))
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
