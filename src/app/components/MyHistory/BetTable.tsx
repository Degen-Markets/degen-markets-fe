import { useState, useRef, useMemo } from "react";
import { BetResponse, BetType } from "@/app/lib/utils/bets/types";
import { WalletButton } from "../Button/ButtonWallet";
import { IoIosArrowDown } from "react-icons/io";
import { useAccount } from "wagmi";
import {
  getBetOutcome,
  getBetTypeText,
  getCurrencySymbolByAddress,
  getFormattedValue,
  getUserRole,
} from "@/app/lib/utils/bets/helpers";
import { Address } from "viem";
import BetOutComeBox from "../LastMatches/common/BetOutComeBox";
import { twMerge } from "tailwind-merge";
import Table from "../Table/Table";
import HistoryTableUserInfo from "./common/HistoryTableUserInfo";
import Image from "next/image";
import BetStatus from "./common/BetStatus";
import { HiChevronDoubleDown } from "react-icons/hi";
import ExpandableBetComponent from "./common/ExpandableBetComponent";
import { BetTableRow } from "../Table/types";
import PixelArtLoader from "../PixelArtLoading";

interface BetTableProps {
  bets: BetResponse[];
}

const BetTable = ({ bets }: BetTableProps) => {
  const { address } = useAccount();
  const [filterType, setFilterType] = useState<BetType | "all">("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const historyTableColumns = [
    { key: "creator", label: "Creator" },
    { key: "stake", label: "Stake" },
    { key: "prediction", label: "Prediction" },
    { key: "vs", label: "VS" },
    { key: "outcome", label: "Outcome" },
    { key: "profitLoss", label: "Profit/Loss" },
    { key: "acceptor", label: "Acceptor" },
  ];

  const historyTableData = useMemo(() => {
    return filteredBets
      .slice()
      .reverse()
      .map((bet) => {
        const {
          currency,
          creator,
          acceptor,
          type,
          value,
          isBetOnUp,
          winner,
          startingMetricValue,
          endingMetricValue,
          strikePriceAcceptor,
          strikePriceCreator,
          expirationTimestamp,
        } = bet;
        const { outcome, bgImage } = getBetOutcome(
          type,
          isBetOnUp,
          startingMetricValue,
          endingMetricValue,
          Number(strikePriceCreator),
          Number(strikePriceAcceptor),
        );
        const formattedValueToDisplay = getFormattedValue(value, currency);
        const profitLoss = `${formattedValueToDisplay} ${getCurrencySymbolByAddress(currency)}`;
        const prediction = isBetOnUp ? "Price Moons" : "Price Rugs";
        const predictionBgImage =
          prediction === "Price Moons"
            ? "/profile/Moon.webp"
            : "/profile/Rug.webp";

        const isBetExpired = !winner && !acceptor;

        const betExpirationTime = Number(expirationTimestamp) * 1000;
        const isBetInPending = new Date() <= new Date(betExpirationTime);
        console.log({
          expirationTimestamp,
        });
        return {
          creator: (
            <HistoryTableUserInfo
              address={creator as Address}
              role={getUserRole(creator, winner, creator, acceptor as Address)}
              layout="default"
            />
          ),
          stake: (
            <div className="center-all flex-col ">
              <div className="block sm:hidden">
                {isBetOnUp ? (
                  <Image
                    src="/ArrowUp.svg"
                    width={24}
                    height={24}
                    alt="arrow-up"
                  />
                ) : (
                  <Image
                    src="/ArrowDown.svg"
                    width={24}
                    height={24}
                    alt="arrow-down"
                  />
                )}
              </div>
              {formattedValueToDisplay} {getCurrencySymbolByAddress(currency)}
            </div>
          ),
          prediction: (
            <BetOutComeBox bgImage={predictionBgImage}>
              <span
                className={`${isBetOnUp ? "text-green-light" : "text-red-light"} drop-shadow-bg`}
              >
                {prediction}
              </span>
            </BetOutComeBox>
          ),
          vs: (
            <div className="flex flex-col justify-center items-center ">
              <span>VS</span>
              <div className="text-sm px-1 bg-purple-medium leading-3 py-1 group-hover:hidden">
                {getBetTypeText(type)}
              </div>
              <BetStatus bet={bet} className="group-hover:hidden" />
              <HiChevronDoubleDown
                size={30}
                className="hidden transition-all ease-in duration-150 group-hover:block animate-bounce h-full py-3 md:py-[7px] z-0"
              />
            </div>
          ),
          outcome: (
            <>
              {isBetExpired ? (
                "xxx xxxx"
              ) : isBetInPending ? (
                <div className="center-all py-2 px-4 font-bold space-x-1">
                  <PixelArtLoader text="" />
                  <span>Awaiting...</span>
                </div>
              ) : (
                <BetOutComeBox bgImage={bgImage}>
                  <span
                    className={`${outcome.status ? "text-green-light" : "text-red-light"} drop-shadow-bg`}
                  >
                    {outcome.text}
                  </span>
                </BetOutComeBox>
              )}
            </>
          ),
          profitLoss: (
            <>
              {isBetExpired ? (
                "xxx xxxx"
              ) : (
                <div
                  className={twMerge(
                    winner?.toLowerCase() === address?.toLowerCase()
                      ? "text-green-light"
                      : "text-red-light",
                  )}
                >
                  {profitLoss}
                </div>
              )}
            </>
          ),
          acceptor: (
            <HistoryTableUserInfo
              address={acceptor as Address}
              role={getUserRole(
                acceptor as Address,
                winner,
                creator,
                acceptor as Address,
              )}
              layout="reverse"
            />
          ),
          bet, // Add the bet data to be used in the expandable content
        };
      });
  }, [address, filteredBets]);

  return (
    <div>
      <div className="flex justify-end p-2 mb-4 space-x-2 text-lg">
        <div
          className="relative inline-block text-left w-fit z-20" // z-20 to keep the filter menu at the top of the table.
          onBlur={handleBlur}
          tabIndex={0}
          ref={dropdownRef}
        >
          <div className="w-full flex justify-between items-center">
            <WalletButton
              className=" lg:w-auto whitespace-nowrap"
              size="small"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              Filter Bets
              <IoIosArrowDown />
            </WalletButton>
          </div>
          {isDropdownOpen && (
            <div className="absolute rounded-lg pixel-art-border-xs-dark text-center  text-black-medium bg-gradient-to-r from-pink-light via-vivid-medium to-yellow-light flex flex-col justify-center items-center shadow-lg w-full">
              {dropdownMenuItems.map(({ label, type }) => (
                <div
                  key={type}
                  className={`py-2 w-full rounded-lg text-lg cursor-pointer ${filterType === type ? "bg-blue-light bg-opacity-55 text-white font-bold" : "hover:bg-gradient-to-r hover:from-yellow-light hover:via-pink-light hover:to-vivid-medium  hover:text-white"}`}
                  role="menuitem"
                  onClick={() => filterBets(type)}
                >
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Table
        columns={historyTableColumns}
        data={historyTableData}
        isExpandable={true}
        renderExpandableContent={(row) => (
          <ExpandableBetComponent bet={row.bet} />
        )}
      />
    </div>
  );
};

export default BetTable;
