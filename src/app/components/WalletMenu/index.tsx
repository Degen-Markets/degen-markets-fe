import { DropdownProps, IWalletMenuItem } from "@/app/lib/utils/bets/types";
import { useRouter } from "next/navigation";
import React, { useRef, useEffect } from "react";
import WalletMenuHeader from "./WalletMenuHeader";
import WalletMenuList from "./WalletMenuList";

const WalletMenu: React.FC<DropdownProps> = ({
  heading,
  menu,
  account,
  setNav,
}) => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (dropdownRef.current) {
      dropdownRef.current.classList.toggle("dropDown-hidden");
    }
  };

  const handleItemClick = (item: IWalletMenuItem) => {
    if (dropdownRef.current) {
      dropdownRef.current.classList.add("dropDown-hidden");
    }
    item.fn();
    setNav(false);
    if (item.link) {
      router.push(item.link);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        dropdownRef.current.classList.add("dropDown-hidden");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative">
      <div onClick={toggleDropdown}>{heading}</div>
      <div
        ref={dropdownRef}
        className="dropDown-hidden pixel-art-border-xs-dark text-black absolute rounded-xl  bg-gradient-to-r from-pink-light via-vivid-medium to-yellow-light flex flex-col justify-center items-center shadow-lg w-full top-0 z-20"
      >
        <div className="w-full lg:max-w-56  bg-gradient-to-r from-pink-light via-vivid-medium to-yellow-light rounded-xl">
          <WalletMenuHeader displayName={account} />
          <div className="h-0.5 w-full bg-gradient-to-r from-yellow-light via-pink-light to-vivid-medium rounded-xl" />
        </div>
        <WalletMenuList menu={menu} handleItemClick={handleItemClick} />
      </div>
    </div>
  );
};

export default WalletMenu;
