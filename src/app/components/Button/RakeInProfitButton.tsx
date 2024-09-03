"use client";
import { useState } from "react";
import { ButtonGradient } from "@/app/components/Button";

const RakeInProfitButton = () => {
  const [profits, setProfits] = useState({ usdc: 0, eth: 0 });

  return (
    <div className="flex justify-center items-end flex-col">
      <ButtonGradient size="small" className="text-sm">
        Rake in Profits
      </ButtonGradient>
      <p className="text-yellow-main drop-shadow-sm mt-1 text-sm font-bold text-end">
        Unclaimed funds {profits.usdc} USDC and {profits.eth} ETH.
      </p>
    </div>
  );
};

export default RakeInProfitButton;
