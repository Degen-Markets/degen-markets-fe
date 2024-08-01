import React from "react";
import BetCard from "../../BetCard";
import { BetResponse } from "@/app/lib/utils/bets/types";

const ExpandableBetComponent = ({ bet }: { bet: BetResponse }) => {
  const { creationTimestamp, acceptanceTimestamp, expirationTimestamp } = bet;
  const formatDate = (timestamp: string) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleString(); // Convert date to a readable format
  };
  return (
    <div>
      <p className="text-3xl">Bet Details</p>
      <div className="flex justify-center items-center border-4 border-b-0 text-lg">
        <p className="px-2">
          <strong>Created at:</strong> {formatDate(creationTimestamp)}
        </p>
        {acceptanceTimestamp && (
          <>
            <p className="border-x-4 px-2">
              <strong>Accepted at:</strong> {formatDate(acceptanceTimestamp)}
            </p>
            <p className="px-2">
              <strong>Ended at:</strong> {formatDate(expirationTimestamp)}
            </p>
          </>
        )}
      </div>
      <BetCard bet={bet} />
    </div>
  );
};

export default ExpandableBetComponent;
