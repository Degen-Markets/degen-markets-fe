import { useState, useRef, useEffect } from "react";
import { BetResponse, BetType } from "@/app/lib/utils/bets/types";
import BetTableRow from "./BetTableRow";
import { WalletButton } from "../Button/ButtonWallet";
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from "tailwind-merge";

interface BetTableProps {
  bets: BetResponse[];
}

const BetTable = ({ bets }: BetTableProps) => {
  const [isAllExpanded, setIsAllExpanded] = useState(false);
  const [filterType, setFilterType] = useState<BetType | "all">("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleAllRows = () => setIsAllExpanded((prev) => !prev);

  const filterBets = (type: BetType | "all") => {
    setFilterType(type);
    setIsDropdownOpen(false);
  };
  const filteredBets =
    filterType === "all" ? bets : bets.filter((bet) => bet.type === filterType);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!dropdownRef.current?.contains(event.relatedTarget as Node)) {
      setIsDropdownOpen(false);
    }
  };

  const dropdownMenuItems: { label: string; type: BetType | "all" }[] = [
    { label: "Bull and Bear", type: "binary" },
    { label: "Price Is Right", type: "closest-guess-wins" },
    { label: "All Bets", type: "all" },
  ];

  return (
    <div>
      <div className="flex justify-end p-2 mb-4">
        <div
          className="relative inline-block text-left w-fit z-20" // z-20 to keep the filter menu at the top of the table.
          onBlur={handleBlur}
          tabIndex={0}
          ref={dropdownRef}
        >
          <div className="w-full flex justify-between items-center">
            <WalletButton
              className="!w-40 lg:w-auto"
              size="small"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              Filter Bets
              <IoIosArrowDown />
            </WalletButton>
          </div>
          {isDropdownOpen && (
            <div className="absolute pixel-art-border-xs-dark text-center  text-black bg-gradient-to-r from-cadet-blue-light to-cadet-blue-dark flex flex-col justify-center items-center shadow-lg w-full">
              {dropdownMenuItems.map(({ label, type }) => (
                <div
                  key={type}
                  className={`py-2 w-full text-lg cursor-pointer ${filterType === type ? "bg-prussian-dark text-white" : "hover:bg-gradient-to-r hover:from-cadet-blue-dark hover:to-cadet-blue-light hover:text-white"}`}
                  role="menuitem"
                  onClick={() => filterBets(type)}
                >
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>
        <WalletButton
          className="!w-40 lg:w-fit"
          size="small"
          onClick={toggleAllRows}
        >
          {isAllExpanded ? "Collapse All" : "Expand All"}
        </WalletButton>
      </div>
      <div className="min-w-full bg-prussian-dark text-white">
        <div className="grid grid-cols-5 sm:grid-cols-9 sticky bg-prussian-dark top-0 shadow-sm shadow-black z-10">
          {" "}
          {/* z-10 to avoid the TableRow's icon overlap the Header of the table */}
          <div className="p-4 sm:col-span-2 border text-center center-all">
            Creator
          </div>
          <div className="p-4 border text-center center-all">Stake</div>
          <div
            className={
              "p-4 border text-center hidden sm:flex justify-center items-center"
            }
          >
            Prediction
          </div>
          <div className="p-4 border text-center flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <span>VS</span>
              <div className="text-sm">Bet</div>
              <div className="text-sm">Status</div>
            </div>
          </div>
          <div
            className={
              "p-4 border text-center hidden sm:flex justify-center items-center"
            }
          >
            Outcome
          </div>
          <div className="p-4 border text-center center-all">Profit/Loss</div>
          <div className="p-4 border sm:col-span-2 text-center center-all">
            Acceptor
          </div>
        </div>

        <div className="shadow-inner shadow-black">
          {filteredBets
            .slice()
            .reverse()
            .map((bet, index) => (
              <BetTableRow
                key={bet.id}
                bet={bet}
                isEven={index % 2 === 0}
                isAllExpanded={isAllExpanded}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BetTable;
