import { IWalletMenuItem } from "@/app/lib/utils/bets/types";
import React from "react";
import WalletMenuItem from "./WalletMenuItem";

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
          <React.Fragment key={index}>
            <WalletMenuItem
              menuItem={menuItem}
              handleItemClick={handleItemClick}
            />
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
