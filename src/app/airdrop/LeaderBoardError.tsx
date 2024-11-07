import React from "react";
import { Button } from "../components/Button/Button";
import Link from "next/link";
import XIcon from "../components/Icons/XIcon";
import TelegramIcon from "../components/Icons/TelegramIcon";

const LeaderBoardError = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in-down">
        Oops! Something went wrong
      </h1>
      <p className="max-w-xl w-full text-xl text-lavender-blue mb-8 animate-fade-in-up text-center">
        We encountered an issue while loading the leaderboard. Please try
        refreshing the page or check back later.
      </p>
      <div className="animate-fade-in flex justify-center">
        <Button onClick={() => window.location.reload()}>Refresh Page</Button>
      </div>
      <div className="flex flex-col justify-center items-center text-sm text-lavender-blue mt-4">
        If the problem persists, Please Contact for assistance.
        <div className="flex items-center justify-center space-x-2 my-2">
          <Link href="https://x.com/DEGEN_MARKETS" target="_blank">
            <XIcon className="hover:text-primary" />
          </Link>
          <Link href="https://t.me/+I6PUfipOKlY5MWUx" target="_blank">
            <TelegramIcon className="hover:text-primary" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardError;
