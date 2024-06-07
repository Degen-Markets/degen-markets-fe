import { DropdownProps, IWalletMenuItem } from "@/app/lib/utils/bets/types";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import WalletMenuHeader from "./WalletMenuHeader";
import WalletMenuList from "./WalletMenuList";

const WalletMenu: React.FC<DropdownProps> = ({
  heading,
  menu,
  account,
  accountModal,
  setNav,
  isOpen,
  setIsOpen,
}) => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (item: IWalletMenuItem) => {
    setIsOpen(false);
    item.fn();
    setNav(false);
    if (item.link) {
      router.push(item.link);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!dropdownRef.current?.contains(event.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
      tabIndex={-1} // Allows the div to receive focus programmatically but not via keyboard navigation
      onBlur={handleBlur}
    >
      <div onClick={toggleDropdown}>{heading}</div>
      {isOpen && (
        <div className="pixel-art-border-xs-dark text-black absolute bg-gradient-to-r from-cadet-blue-light to-cadet-blue-dark flex flex-col justify-center items-center shadow-lg w-full">
          <div className="w-full lg:max-w-56 bg-gradient-to-r from-cadet-blue-light to-cadet-blue-dark">
            <WalletMenuHeader
              displayName={account.displayName}
              accountModal={accountModal}
            />
            <div className="h-0.5 w-full bg-gradient-to-r from-cadet-blue-dark to-cadet-blue-light" />
          </div>
          <WalletMenuList menu={menu} handleItemClick={handleItemClick} />
        </div>
      )}
    </div>
  );
};

export default WalletMenu;
