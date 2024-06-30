import { useState } from "react";
import { BetResponse, BetType } from "@/app/lib/utils/bets/types";
import BetTableRow from "./BetTableRow";
import { ButtonPrimary, ButtonSecondary } from "../Button";
import { WalletButton } from "../Button/ButtonWallet";

interface BetTableProps {
  bets: BetResponse[];
  label: string;
}

const BetTable = ({ bets, label }: BetTableProps) => {
  const [isAllExpanded, setIsAllExpanded] = useState(false);
  const [filteredBets, setFilteredBets] = useState<BetResponse[]>(bets);
  const [filterType, setFilterType] = useState<BetType | "all">("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleAllRows = () => {
    setIsAllExpanded(!isAllExpanded);
  };

  const filterBets = (type: BetType | "all") => {
    setFilterType(type);
    if (type === "all") {
      setFilteredBets(bets);
    } else {
      setFilteredBets(bets.filter((bet) => bet.type === type));
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end p-2 mb-4">
        <div className="relative inline-block text-left">
          <div>
            <WalletButton
              size="small"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Filter Bets
            </WalletButton>
          </div>
          {isDropdownOpen && (
            <div className="absolute pixel-art-border-xs-dark text-black bg-gradient-to-r from-cadet-blue-light to-cadet-blue-dark flex flex-col justify-center items-center shadow-lg w-full">
              <div
                className=" w-full text-center"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div
                  className="py-2 w-full text-sm hover:bg-gradient-to-r hover:from-cadet-blue-dark hover:to-cadet-blue-light cursor-pointer hover:text-white"
                  role="menuitem"
                  onClick={() => {
                    filterBets("binary");
                    setIsDropdownOpen(false);
                  }}
                >
                  Bull and Bear
                </div>
                <div
                  className="py-2 w-full text-sm hover:bg-gradient-to-r hover:from-cadet-blue-dark hover:to-cadet-blue-light cursor-pointer hover:text-white"
                  role="menuitem"
                  onClick={() => {
                    filterBets("closest-guess-wins");
                    setIsDropdownOpen(false);
                  }}
                >
                  Price Is Right
                </div>
                <div
                  className="py-2 w-full text-sm hover:bg-gradient-to-r hover:from-cadet-blue-dark hover:to-cadet-blue-light cursor-pointer hover:text-white"
                  role="menuitem"
                  onClick={() => {
                    filterBets("all");
                    setIsDropdownOpen(false);
                  }}
                >
                  All Bets
                </div>
              </div>
            </div>
          )}
        </div>
        <WalletButton size="small" onClick={toggleAllRows}>
          {isAllExpanded ? "Collapse All" : "Expand All"}
        </WalletButton>
      </div>
      <table className="min-w-full bg-prussian-dark text-white">
        <thead>
          <tr>
            <th className="p-4 col-span-2 border text-center">Creator</th>
            <th className="p-4 border text-center">Profit/Loss</th>
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
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BetTable;
