import {
  abbreviateETHBalance,
  getDisplayNameForAddress,
} from "@/app/lib/utils/bets/helpers";
import useIsChainSupported from "@/app/lib/utils/hooks/useIsChainSupported";
import { ProfileDetailsProps } from "@/app/types/dialog";
import { useCallback, useEffect, useMemo, useState } from "react";
import UserAvatar from "../../UserAvatar";
import { CgCopy, CgExternal } from "react-icons/cg";
import { Button, ButtonPrimary } from "../../Button";
import { BiCheckDouble } from "react-icons/bi";

export default function ProfileDetails({
  address,
  balance,
  onDisconnect,
}: ProfileDetailsProps) {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const { chain } = useIsChainSupported();
  const blockExplorerUrl = useMemo(
    () => chain?.blockExplorers.default.url,
    [chain],
  );
  const copyAddressAction = useCallback(() => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopiedAddress(true);
    }
  }, [address]);

  useEffect(() => {
    if (copiedAddress) {
      const timer = setTimeout(() => {
        setCopiedAddress(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [copiedAddress]);

  if (!address) {
    return null;
  }

  const accountName = getDisplayNameForAddress(address);
  const ethBalance = balance?.formatted;
  const displayBalance = ethBalance
    ? abbreviateETHBalance(parseFloat(ethBalance))
    : undefined;

  return (
    <div className="flex flex-col justify-center items-center">
      <UserAvatar
        width={200}
        height={200}
        address={address}
        className="w-20 h-20 md:w-32 md:h-32"
      />
      <div className="flex justify-between flex-col items-center mt-4">
        <div className="flex items-center space-x-1">
          <p>{accountName}</p>
          <a href={`${blockExplorerUrl}/address/${address}`} target="_blank">
            <CgExternal />
          </a>
        </div>
        {!!balance && (
          <div>
            {displayBalance} {balance?.symbol}
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between items-center  md:space-x-5 mt-3">
        <ButtonPrimary size="small" onClick={copyAddressAction}>
          <div className="flex text-white space-x-1 items-center justify-center">
            {copiedAddress ? <BiCheckDouble size={20} /> : <CgCopy size={20} />}
            <p>{copiedAddress ? "Copied!" : "Copy Address"}</p>
          </div>
        </ButtonPrimary>
        <Button size="small" className="text-white" onClick={onDisconnect}>
          Disconnect
        </Button>
      </div>
    </div>
  );
}
