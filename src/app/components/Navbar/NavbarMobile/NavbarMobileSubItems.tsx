import React from "react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface NavbarMobileSubItemsProps {
  link: string;
  routeName: string;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarMobileSubItems: React.FC<NavbarMobileSubItemsProps> = ({
  link,
  routeName,
  setNav,
}) => {
  const router = useRouter();

  return (
    <li
      className={twMerge(
        "hover:bg-gray-200 hover:text-main rounded-md w-full text-center",
      )}
    >
      <div
        onClick={() => {
          router.push(link);
          setNav(false);
        }}
        className="flex items-center justify-center"
      >
        <div className="block px-4 py-2 uppercase">{routeName}</div>
      </div>
    </li>
  );
};

export default NavbarMobileSubItems;
