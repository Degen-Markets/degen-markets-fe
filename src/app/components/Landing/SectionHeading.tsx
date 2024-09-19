import { ReactElement } from "react";
import { CardHeading } from "../Card";
import { twMerge } from "tailwind-merge";

const SectionHeader = ({
  icon,
  title,
  className,
}: {
  icon?: ReactElement;
  title: string;
  className?: string;
}) => (
  <div className="flex space-x-2">
    <CardHeading
      icon={icon}
      bordered={false}
      className={twMerge("uppercase items-center", className)}
    >
      {title}
    </CardHeading>
  </div>
);

export default SectionHeader;
