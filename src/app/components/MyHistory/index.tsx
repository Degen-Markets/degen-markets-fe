"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
} from "@/app/components/Tabs/Tabs";
import { ButtonPrimary } from "@/app/components/Button";
import { useRouter } from "next/navigation";
import {
  getCurrencySymbolByAddress,
  getDisplayNameForAddress,
  isBetConcluded,
  isBetOpen,
  isBetRunning,
} from "@/app/lib/utils/bets/helpers";
import { BetResponse, Ticker, Metric } from "@/app/lib/utils/bets/types";
import { SETTLE_CURRENCY } from "@/app/lib/utils/bets/constants";
import { Address, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import UserAvatar from "@/app/components/UserAvatar"; // Assuming you have a UserAvatar component
import BetCard from "../BetCard";

const MyHistory = () => {
  const { address } = useAccount();
  const router = useRouter();
  const [bets, setBets] = useState<BetResponse[]>([]);
  const [profits, setProfits] = useState({ usdc: 0, eth: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const fetchBets = useCallback(async () => {
    const fetchedBets: BetResponse[] = [
      {
        id: "1",
        creator: "0x5c6532...d087a",
        creationTimestamp: "2023-06-25T12:34:56Z",
        acceptor: "0x123456...789abc",
        acceptanceTimestamp: "2023-06-26T14:34:56Z",
        ticker: Ticker.BLUR,
        metric: Metric.MARKET_CAP_DOMINANCE,
        isBetOnUp: true,
        value: "100",
        currency: zeroAddress,
        startingMetricValue: 150,
        endingMetricValue: 160,
        winner: "0x5c6532...d087a",
        isWithdrawn: false,
        withdrawalTimestamp: "",
        winTimestamp: "2023-06-27T15:34:56Z",
        lastActivityTimestamp: "2023-06-27T15:34:56Z",
        expirationTimestamp: "2023-07-01T12:34:56Z",
        isPaid: true,
        type: "binary",
        strikePriceCreator: "150",
        strikePriceAcceptor: "160",
      },
      {
        id: "2",
        creator: "0x5c6532...d087a",
        creationTimestamp: "2023-06-25T12:34:56Z",
        acceptor: "0x123456...789abc",
        acceptanceTimestamp: "2023-06-26T14:34:56Z",
        ticker: Ticker.ETH,
        metric: Metric.PRICE,
        isBetOnUp: false,
        value: "50",
        currency: SETTLE_CURRENCY.USDC,
        startingMetricValue: 700,
        endingMetricValue: 650,
        winner: "0x123456...789abc",
        isWithdrawn: false,
        withdrawalTimestamp: "",
        winTimestamp: "2023-06-27T15:34:56Z",
        lastActivityTimestamp: "2023-06-27T15:34:56Z",
        expirationTimestamp: "2023-07-01T12:34:56Z",
        isPaid: true,
        type: "closest-guess-wins",
        strikePriceCreator: "700",
        strikePriceAcceptor: "650",
      },
      {
        id: "3",
        creator: "0x5c6532...d087a",
        creationTimestamp: "2023-06-25T12:34:56Z",
        acceptor: null,
        acceptanceTimestamp: null,
        ticker: Ticker.BTC,
        metric: Metric.VOLUME,
        isBetOnUp: true,
        value: "200",
        currency: SETTLE_CURRENCY.USDbC,
        startingMetricValue: 30000,
        endingMetricValue: null,
        winner: null,
        isWithdrawn: false,
        withdrawalTimestamp: "",
        winTimestamp: null,
        lastActivityTimestamp: "2023-06-27T15:34:56Z",
        expirationTimestamp: "2023-07-01T12:34:56Z",
        isPaid: false,
        type: "binary",
        strikePriceCreator: "30000",
        strikePriceAcceptor: null,
      },
      {
        id: "4",
        creator: "0x5c6532...d087a",
        creationTimestamp: "2023-06-25T12:34:56Z",
        acceptor: "0x123456...789abc",
        acceptanceTimestamp: "2023-06-26T14:34:56Z",
        ticker: Ticker.BLUR,
        metric: Metric.MARKET_CAP_DOMINANCE,
        isBetOnUp: true,
        value: "100",
        currency: zeroAddress,
        startingMetricValue: 150,
        endingMetricValue: 160,
        winner: "0x5c6532...d087a",
        isWithdrawn: false,
        withdrawalTimestamp: "",
        winTimestamp: "2023-06-27T15:34:56Z",
        lastActivityTimestamp: "2023-06-27T15:34:56Z",
        expirationTimestamp: "2023-07-01T12:34:56Z",
        isPaid: true,
        type: "binary",
        strikePriceCreator: "150",
        strikePriceAcceptor: "160",
      },
      {
        id: "5",
        creator: "0x5c6532...d087a",
        creationTimestamp: "2023-06-25T12:34:56Z",
        acceptor: "0x123456...789abc",
        acceptanceTimestamp: "2023-06-26T14:34:56Z",
        ticker: Ticker.ETH,
        metric: Metric.PRICE,
        isBetOnUp: false,
        value: "50",
        currency: SETTLE_CURRENCY.USDC,
        startingMetricValue: 700,
        endingMetricValue: 650,
        winner: "0x123456...789abc",
        isWithdrawn: false,
        withdrawalTimestamp: "",
        winTimestamp: "2023-06-27T15:34:56Z",
        lastActivityTimestamp: "2023-06-27T15:34:56Z",
        expirationTimestamp: "2023-07-01T12:34:56Z",
        isPaid: true,
        type: "closest-guess-wins",
        strikePriceCreator: "700",
        strikePriceAcceptor: "650",
      },
      {
        id: "6",
        creator: "0x5c6532...d087a",
        creationTimestamp: "2023-06-25T12:34:56Z",
        acceptor: null,
        acceptanceTimestamp: null,
        ticker: Ticker.BTC,
        metric: Metric.VOLUME,
        isBetOnUp: true,
        value: "200",
        currency: SETTLE_CURRENCY.USDbC,
        startingMetricValue: 30000,
        endingMetricValue: null,
        winner: null,
        isWithdrawn: false,
        withdrawalTimestamp: "",
        winTimestamp: null,
        lastActivityTimestamp: "2023-06-27T15:34:56Z",
        expirationTimestamp: "2023-07-01T12:34:56Z",
        isPaid: false,
        type: "binary",
        strikePriceCreator: "30000",
        strikePriceAcceptor: null,
      },
    ];
    setBets(fetchedBets);

    const wonBets = fetchedBets.filter((bet) => bet.winner === address);
    const usdcProfits = wonBets
      .filter((bet) => bet.currency === SETTLE_CURRENCY.USDC)
      .reduce((acc, bet) => acc + parseFloat(bet.value) * 2, 0);
    const ethProfits = wonBets
      .filter((bet) => bet.currency === SETTLE_CURRENCY.ETH)
      .reduce((acc, bet) => acc + parseFloat(bet.value) * 2, 0);
    setProfits({ usdc: usdcProfits, eth: ethProfits });
  }, [address]);

  useEffect(() => {
    if (address) {
      fetchBets();
    }
  }, [address, fetchBets]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rakeInProfits = async () => {
    console.log("Raking in profits...");
  };

  const categorizedBets = {
    open: bets.filter(isBetOpen),
    running: bets.filter(isBetRunning),
    concluded: bets.filter(isBetConcluded),
  };

  const betCategories = [
    {
      label: "Existing Bets",
      className: "bg-indigo-medium md:text-2xl",
      bets: categorizedBets.open,
    },
    {
      label: "History",
      className: "bg-purple-medium md:text-2xl",
      bets: categorizedBets.concluded, // Changed to concluded for History
    },
    // {
    //   label: "Running Bets",
    //   className: "bg-white text-prussian-dark md:text-2xl",
    //   bets: categorizedBets.running, // Added Running Bets category
    // },
  ];

  const defaultActiveIndex = categorizedBets.open.length
    ? 0
    : categorizedBets.running.length
      ? 2
      : 1;

  return (
    <div className="max-w-7xl mx-auto p-4 text-center">
      <div className="mb-8">
        <UserAvatar
          address={address}
          className="w-40 h-40 mx-auto rounded-full"
        />
        <h2 className="text-3xl font-semibold mt-4">@DEGEN</h2>
        <p className="text-prussian-dark">0x5c6532...d087a</p>
      </div>
      <div>
        <div className="flex justify-center items-end flex-col">
          <ButtonPrimary size="regular" onClick={rakeInProfits}>
            Rake in Profits
          </ButtonPrimary>
          <p className="mb-4">
            You have won {profits.usdc} USDC and {profits.eth} ETH.
          </p>
        </div>
        <Tabs defaultActiveIndex={defaultActiveIndex}>
          <TabList className="border-b border-gray-300 flex">
            {betCategories.map((category, index) => (
              <Tab
                key={index}
                index={index}
                className={`${category.className} px-4 py-2`}
              >
                {category.label}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="">
            {betCategories.map((category, index) => {
              const hasBetsInCategory = category.bets.length > 0;

              return (
                <TabPanel key={index} index={index} className="">
                  {hasBetsInCategory ? (
                    isMobile ? (
                      <div className="flex flex-col space-y-4">
                        {category.bets.map((bet) => (
                          <BetCard key={bet.id} bet={bet} />
                        ))}
                      </div>
                    ) : (
                      <BetTable bets={category.bets} label={category.label} />
                    )
                  ) : (
                    <div className="text-center flex">
                      <div className="flex flex-col items-center w-full space-y-2 p-8 ">
                        <p className="text-lg md:text-2xl text-prussian-dark">
                          There are no {category.label.toLowerCase()} right now.
                          Go make one!
                        </p>
                        <ButtonPrimary
                          size="small"
                          onClick={() => router.push("/create-bet")}
                        >
                          Create bet
                        </ButtonPrimary>
                      </div>
                    </div>
                  )}
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default MyHistory;

const BetTableRow = ({
  bet,
  isEven,
}: {
  bet: BetResponse;
  isEven: boolean;
}) => {
  const router = useRouter();
  const getBetTypeText = (type: BetType) => {
    switch (type) {
      case "binary":
        return "Bull and Bear";
      case "closest-guess-wins":
        return "Price is Right";
      default:
        return "";
    }
  };
  return (
    <tr
      className={`${isEven ? "bg-gray-700" : "bg-gray-900"} hover:bg-purple-600 transition duration-300 cursor-pointer border`}
      onClick={() => router.push(`bets/${bet.id}`)}
    >
      <td className="p-4 border col-span-2 text-center">
        <div className="flex items-center space-x-2 justify-center">
          <UserAvatar address={bet.creator} className="w-8 h-8" />
          <p>{getDisplayNameForAddress(bet.creator)}</p>
        </div>
      </td>
      <td className="p-4 border text-center">
        {bet.value} {getCurrencySymbolByAddress(bet.currency)}
      </td>
      <td className="p-4 border text-red-main text-center">Price Moons</td>
      <td className="p-4 border text-center ">
        <div className="flex flex-col justify-center items-center">
          <span>VS</span>
          <div className="text-sm">{getBetTypeText(bet.type)}</div>
        </div>
      </td>
      <td className="p-4 border text-green-main text-center">Price Rugs</td>
      <td className="p-4 border text-center">
        {bet.value} {getCurrencySymbolByAddress(bet.currency)}
      </td>
      <td className="p-4 border col-span-2 text-center">
        <div className="flex items-center space-x-2 justify-center">
          <span>{bet.acceptor}</span>
          <UserAvatar address={bet.acceptor as Address} className="w-8 h-8" />
        </div>
      </td>
    </tr>
  );
};

const BetTable = ({ bets, label }: { bets: BetResponse[]; label: string }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-prussian-dark text-white">
        <thead>
          <tr>
            <th className="p-4 col-span-2 border text-center">Creator</th>
            <th className="p-4 border text-center">Stake</th>
            <th className="p-4 border text-center">Prediction</th>
            <th className="p-4 border text-center">
              <div className="flex flex-col justify-center items-center">
                <span>VS</span>
                <div className="text-sm">Bet</div>
              </div>
            </th>
            <th className="p-4 border text-center">Outcome</th>
            <th className="p-4 border text-center">Reward</th>
            <th className="p-4 border col-span-2 text-center">Address</th>
          </tr>
        </thead>
        <tbody>
          {bets.map((bet, index) => (
            <BetTableRow key={bet.id} bet={bet} isEven={index % 2 === 0} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Mobile View
const MobileBetTableRow = ({ bet }: { bet: BetResponse }) => {
  return (
    <div className="bg-gray-700 p-4 mb-2 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-2">
        <UserAvatar address={bet.creator} className="w-8 h-8" />
        <p className="font-bold">{getDisplayNameForAddress(bet.creator)}</p>
      </div>
      <p>
        <strong>Stake:</strong> {bet.value}{" "}
        {getCurrencySymbolByAddress(bet.currency)}
      </p>
      <p>
        <strong>Prediction:</strong> Price Moons
      </p>
      <p>
        <strong>VS:</strong> VS
      </p>
      <p>
        <strong>Outcome:</strong> Price Rugs
      </p>
      <p>
        <strong>Reward:</strong> {bet.value}{" "}
        {getCurrencySymbolByAddress(bet.currency)}
      </p>
      <div className="flex items-center space-x-2">
        <span>
          <strong>Address:</strong> {bet.acceptor}
        </span>
        <UserAvatar address={bet.acceptor as Address} className="w-8 h-8" />
      </div>
    </div>
  );
};

const MobileBetTable = ({ bets }: { bets: BetResponse[] }) => {
  return (
    <div>
      {bets.map((bet) => (
        <MobileBetTableRow key={bet.id} bet={bet} />
      ))}
    </div>
  );
};
