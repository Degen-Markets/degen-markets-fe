import Image from "next/image";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface WidgetIconProps {
  name: string;
  alt: string;
  className: string;
}

const WidgetIcon: FC<WidgetIconProps> = ({ name, alt, className }) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center p-2 rounded-l-xl border border-white",
        `${className}`,
      )}
    >
      <Image
        src={`/widget-icons/${name}-icon.png`}
        alt={alt}
        width={120}
        height={120}
      />
    </div>
  );
};

export default WidgetIcon;
