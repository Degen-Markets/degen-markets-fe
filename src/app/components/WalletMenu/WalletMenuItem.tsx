import { IWalletMenuItem } from "@/app/lib/utils/bets/types";
import React from "react";

interface WalletMenuItemProps {
  menuItem: IWalletMenuItem;
  handleItemClick: (item: IWalletMenuItem) => void;
}

const WalletMenuItem: React.FC<WalletMenuItemProps> = ({
  menuItem,
  handleItemClick,
}) => {
  return (
    <li
      className="py-2 w-full text-sm hover:bg-gradient-to-r hover:from-cadet-blue-dark hover:to-cadet-blue-light cursor-pointer hover:text-white"
      onClick={() => handleItemClick(menuItem)}
    >
      {menuItem.title}
    </li>
  );
};

export default WalletMenuItem;
