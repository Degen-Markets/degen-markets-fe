import { IWalletMenuItem } from "@/app/lib/utils/bets/types";
import React from "react";
import { twMerge } from "tailwind-merge";

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
              className={twMerge(
                "py-2 w-full text-sm hover:bg-gradient-to-r hover:from-yellow-light hover:via-pink-light hover:to-vivid-medium cursor-pointer hover:text-white",
                lastIndex && " hover:rounded-b-xl",
              )}
              onClick={() => handleItemClick(menuItem)}
            >
              {menuItem.title}
            </li>

            {!lastIndex && (
              <div className="h-[1px] w-full bg-gradient-to-r from-yellow-light via-pink-light to-vivid-medium" />
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default WalletMenuList;
