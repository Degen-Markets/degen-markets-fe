import { useState, useRef, useEffect } from "react";
import { BetResponse, BetType } from "@/app/lib/utils/bets/types";
import BetTableRow from "./BetTableRow";
import { WalletButton } from "../Button/ButtonWallet";
import { IoIosArrowDown } from "react-icons/io";

interface BetTableProps {
  bets: BetResponse[];
  label: string;
}

const BetTable = ({ bets, label }: BetTableProps) => {
  const [isAllExpanded, setIsAllExpanded] = useState(false);
  const [filteredBets, setFilteredBets] = useState<BetResponse[]>(bets);
  const [filterType, setFilterType] = useState<BetType | "all">("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleAllRows = () => setIsAllExpanded((prev) => !prev);

  const filterBets = (type: BetType | "all") => {
    setFilterType(type);
    setFilteredBets(
      type === "all" ? bets : bets.filter((bet) => bet.type === type),
    );
    setIsDropdownOpen(false);
  };

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
    <div className="overflow-x-auto">
      <div className="flex justify-end p-2 mb-4">
        <div
          className="relative inline-block text-left w-fit"
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
      <table className="min-w-full bg-prussian-dark text-white">
        {!isMobile && (
          <thead>
            <tr>
              <th className="p-4 col-span-2 border text-center">Creator</th>
              <th className="p-4 border text-center">Stake</th>
              <th className="p-4 border text-center">Prediction</th>
              <th className="p-4 border text-center">
                <div className="flex flex-col justify-center items-center">
                  <span>VS</span>
                  <div className="text-sm">Bet</div>
                  <div className="text-sm">Status</div>
                </div>
              </th>
              <th className="p-4 border text-center">Outcome</th>
              <th className="p-4 border text-center">Profit/Loss</th>
              <th className="p-4 border col-span-2 text-center">Acceptor</th>
            </tr>
          </thead>
        )}
        <tbody>
          {filteredBets
            .slice()
            .reverse()
            .map((bet, index) => (
              <BetTableRow
                key={bet.id}
                bet={bet}
                isEven={index % 2 === 0}
                isAllExpanded={isAllExpanded}
                isMobile={isMobile}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BetTable;
