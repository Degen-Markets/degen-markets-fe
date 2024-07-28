import React from "react";
import Image from "next/image";

interface ToggleProps {
  isActive: boolean;
  icon: string;
  iconAlt: string;
  onClick: () => void;
  children: React.ReactNode;
}

const BetToggleButton: React.FC<ToggleProps> = ({
  isActive,
  icon,
  iconAlt,
  onClick,
  children,
}) => {
  return (
    <div
      className={`uppercase font-bold flex justify-center items-center rounded-[30px] py-2 px-7 md:py-3 md:px-10 ${
        isActive
          ? "bg-blue-light !hover:bg-purple-light text-white"
          : "bg-black-medium text-white cursor-pointer"
      }`}
      onClick={onClick}
    >
      <Image src={icon} alt={iconAlt} width={50} height={50} className="mr-1" />
      <p className="text-2xl md:text-4xl drop-shadow-text">{children}</p>
    </div>
  );
};

export default BetToggleButton;
