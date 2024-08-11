import { useMemo, ChangeEvent, useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { useBetContext } from "../BetContext";
import { useAccount } from "wagmi";
import { WalletButton } from "@/app/components/Button/ButtonWallet";
import { DialogType, useDialog } from "@/app/components/Dialog/dialog";
import useBalances from "@/app/hooks/useBalances";
import { Address, parseEther } from "viem";
import useGetUserAccountDetail from "@/app/hooks/useGetUserAccountDetail";
import BetDetail from "./BetDetail";
import CreateBetButton from "@/app/components/CreateBetButton";
import {
  BetComponentProps,
  TickerCmcApiData,
} from "@/app/lib/utils/bets/types";
import useIsChainSupported from "@/app/hooks/useIsChainSupported";
import PrettySearch from "@/app/components/TokenSearch/PrettySearch";
import { getTopTickersCmc } from "@/app/lib/utils/api/getTopTickersCmc";

const BullOrBearLayout = ({
  ethPrice,
  tickerCmcResponse,
}: BetComponentProps) => {
  const { value, setValue } = useBetContext();
  const { address } = useAccount();
  const { isCurrentChainSupported } = useIsChainSupported();
  const { setOpen: setOpenConnector } = useDialog(DialogType.Connector);
  const { setOpen: setOpenSwitchChain } = useDialog(DialogType.SwitchChain);

  const { userBalances } = useBalances(!!value, address);
  const { accountEthBalance, symbol } = useGetUserAccountDetail(
    address as Address,
  );

  const isBalanceEnough = useMemo(() => {
    return userBalances.ETH >= parseEther(value);
  }, [userBalances, value]);

  const handleValueInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      const decimals = newValue.split(/\,|\./)[1];
      if (!decimals || decimals.length < 7) {
        setValue(newValue);
      }
    },
    [setValue],
  );

  const calculatedValue = useMemo(() => {
    return ethPrice ? (Number(value) * ethPrice).toLocaleString() : "0";
  }, [ethPrice, value]);

  const renderBetButton = () => {
    if (!address) {
      return (
        <WalletButton
          size="regular"
          className="!w-full mt-4 rounded-xl uppercase"
          onClick={() => setOpenConnector(true)}
        >
          Connect Wallet
        </WalletButton>
      );
    }
    if (!isCurrentChainSupported) {
      return (
        <WalletButton
          size="small"
          onClick={() => setOpenSwitchChain(true)}
          className="text-xl !w-full mt-4"
        >
          Wrong network
        </WalletButton>
      );
    }
    if (!isBalanceEnough)
      return (
        <WalletButton
          size="regular"
          className="!w-full mt-4 rounded-xl uppercase"
        >
          Not Enough Balance
        </WalletButton>
      );

    return (
      <div className="flex-col md:flex-row flex space-y-2 lg:space-y-0 justify-between gap-3 mt-4">
        <CreateBetButton isBetOneUp betType="binary" className="!w-full" />
        <CreateBetButton
          isBetOneUp={false}
          betType="binary"
          className="!w-full"
        />
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl pt-6 px-3 md:px-6 bg-blue-secondary rounded-xl shadow-md">
      <h2 className="text-4xl font-bold text-center text-white mb-4 drop-shadow-text ">
        BULL OR BEAR
      </h2>
      <div className="flex justify-between items-center py-2 border-t border-black-medium px-2">
        <span className="text-white font-bold text-xl">Duration</span>
        <span className="text-white flex text-xl items-center font-bold">
          6 Hours
          <Image
            src="/games/Timer.svg"
            alt="timer"
            width={20}
            height={20}
            className="ml-2 w-5 h-5 text-white"
          />
        </span>
      </div>
      <div className="p-4 md:pt-8 md:px-8 md:pb-4 bg-black-medium rounded-t-xl  border-2">
        <div className="flex justify-center items-end flex-col-reverse md:flex-row gap-2">
          <PrettySearch tickerCmcResponse={tickerCmcResponse} />
          <div className="flex items-start md:items-center flex-col justify-between w-full md:w-auto ">
            <span className="text-white text-sm whitespace-nowrap font-bold">
              Eth Amount
            </span>
            <input
              type="number"
              defaultValue="0.1"
              value={value}
              onChange={handleValueInput}
              placeholder="0.1"
              lang="en-US"
              step=".000001"
              className="md:w-28 pl-2 md:pr-2 md:py-2 border-2 md:text-center rounded-xl bg-blue-secondary text-white focus:outline-none w-full text-start p-4 md:p-0"
            />
          </div>
        </div>
        {renderBetButton()}
      </div>
      {address && (
        <div className="flex justify-center p-2 divide-x-2 text-sm text-center items-center border-t-0 border-2 rounded-b-xl  bg-black-medium">
          <div className="w-full ">
            <p className="text-sm font-bold">
              ETH Price : ${ethPrice?.toFixed(2)}
            </p>
          </div>
          <div className="w-full text-sm font-bold">
            Your Balance: {accountEthBalance} {symbol}
          </div>
        </div>
      )}
      <BetDetail ethPrice={ethPrice} calculatedValue={calculatedValue} />
    </div>
  );
};

export default BullOrBearLayout;
