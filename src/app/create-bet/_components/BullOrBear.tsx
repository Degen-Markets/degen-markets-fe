import { useMemo, ChangeEvent } from "react";
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

const BullOrBearLayout = ({ ethPrice }: { ethPrice: number | null }) => {
  const { value, setValue } = useBetContext();
  const { address } = useAccount();
  const { setOpen: setOpenConnector } = useDialog(DialogType.Connector);
  const { userBalances } = useBalances(!!value, address);
  const { accountEthBalance, symbol } = useGetUserAccountDetail(
    address as Address,
  );

  const isBalanceEnough = useMemo(() => {
    return userBalances["ETH"] >= parseEther(value);
  }, [userBalances, value]);

  const handleValueInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const decimals = newValue.split(/\,|\./)[1];
    if (!decimals || decimals.length < 7) {
      setValue(newValue);
    }
  };

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
        <CreateBetButton isBetOneUp betType="binary" />
        <CreateBetButton isBetOneUp={false} betType="binary" />
      </div>
    );
  };

  return (
    <div className="w-full max-w-xl pt-6 px-3 md:px-6 bg-blue-secondary rounded-xl shadow-md">
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
        <div className="flex justify-center items-end gap-2">
          <div className="flex items-center w-full">
            <div className="relative w-full border-2 rounded-2xl ">
              <Image
                src="/tokens/ETH.svg"
                alt="ETH"
                width={24}
                height={24}
                className="absolute top-1/2 transform -translate-y-1/2 left-2"
              />
              <input
                type="text"
                name="ETH"
                readOnly={true}
                defaultValue={"ETH"}
                className="pr-2 sm:pr-4 py-2 ring-purple-medium text-[#000] uppercase w-full  rounded-xl pl-10"
                placeholder="ETH"
              />
            </div>
          </div>
          <div className="flex items-center flex-col justify-between ">
            <span className="text-white text-sm whitespace-nowrap font-bold">
              Input Amount
            </span>
            <input
              type="number"
              defaultValue="0.1"
              value={value}
              onChange={handleValueInput}
              placeholder="0.1"
              lang="en-US"
              step=".000001"
              className="w-28 pl-2 pr-2 py-2 border-2 text-center rounded-xl bg-blue-secondary text-white focus:outline-none"
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
