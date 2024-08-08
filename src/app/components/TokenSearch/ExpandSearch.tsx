// components/Search.tsx
import {
  useState,
  useRef,
  useEffect,
  MutableRefObject,
  useCallback,
  ChangeEvent,
} from "react";
import { IoSearchOutline } from "react-icons/io5";
import TokenSearchComponent from "./TokenSearchComponent";
import { debounce } from "@/app/lib/utils/bets/helpers";
interface SearchInputProps {
  onSearch: (tokenCode: string) => void;
}

export default function Search() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setOpenSearch(false);
  };

  const openSearchBox = () => {
    setOpenSearch(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      handleCollapse();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center space-x-2" ref={searchRef}>
      <div
        className={`flex items-center justify-center transition-all duration-300 ${
          isExpanded ? " w-72 md:w-80" : "w-10"
        } border border-gray-300 rounded-xl overflow-hidden`}
      >
        <button
          onClick={handleExpand}
          className="p-2 focus:outline-none bg-blue-dark"
        >
          <IoSearchOutline size={25} color="white" />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleChange(e)}
          className={`${
            isExpanded ? "block" : "hidden"
          } flex-grow px-4 py-3 focus:outline-none text-black-main text-sm w-fit rounded-r-xl`}
          placeholder="Search Token"
          onFocus={openSearchBox}
        />
      </div>
      {/* {openSearch && <TokenSearchComponent />} */}
    </div>
  );
}
