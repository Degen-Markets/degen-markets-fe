import React from "react";
import Link from "next/link";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

const NavbarMobileSubItems: React.FC<{
  link: string;
  routeName: string;
  comingSoon?: boolean;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ link, routeName, comingSoon, setNav }) => {
  const router = useRouter();
  return comingSoon ? (
    <li
      className={twMerge(
        "hover:bg-gray-200 hover:text-black-medium rounded-md w-full text-center",
        comingSoon && "opacity-35 cursor-not-allowed",
      )}
    >
      <div className="flex items-center justify-center">
        <div className="block px-4 py-2 uppercase">{routeName}</div>
        {comingSoon && (
          <Image
            src="/navIcons/lock.svg"
            alt={routeName}
            width={20}
            height={20}
          />
        )}
      </div>
    </li>
  ) : (
    <li
      className={twMerge(
        "hover:bg-gray-200 hover:text-black-medium rounded-md w-full text-center",
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
        {comingSoon && (
          <Image
            src="/navIcons/lock.svg"
            alt={routeName}
            width={20}
            height={20}
          />
        )}
      </div>
    </li>
  );
};

export default NavbarMobileSubItems;
