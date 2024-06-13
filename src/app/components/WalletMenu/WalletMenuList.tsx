import { IWalletMenuItem } from "@/app/lib/utils/bets/types";
import React from "react";
import SwitchChainDialog from "../Dialog/SwitchChainDialog";

interface WalletMenuListProps {
  menu: IWalletMenuItem[];
  handleItemClick: (item: IWalletMenuItem) => void;
}

const WalletMenuList: React.FC<WalletMenuListProps> = ({
  menu,
  handleItemClick,
}) => {
  return (
    <ul className="w-full text-center">
      {menu.map((menuItem, index) => {
        const lastIndex = menu.length - 1 === index;
        return (
          <React.Fragment key={menuItem.title}>
            <li
              className="py-2 w-full text-sm hover:bg-gradient-to-r hover:from-cadet-blue-dark hover:to-cadet-blue-light cursor-pointer hover:text-white"
              onClick={() => handleItemClick(menuItem)}
            >
              {menuItem.title}
            </li>

            {!lastIndex && (
              <div className="h-[1px] w-full bg-gradient-to-r from-cadet-blue-dark to-cadet-blue-light" />
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default WalletMenuList;
