import { ReactElement } from "react";
import { CardHeading } from "../Card";

const SectionHeader = ({
  icon,
  title,
}: {
  icon?: ReactElement;
  title: string;
}) => (
  <div className="flex items-center space-x-2 ml-5">
    <CardHeading
      icon={icon}
      bordered={false}
      className="uppercase items-center justify-center"
    >
      {title}
    </CardHeading>
  </div>
);

export default SectionHeader;
