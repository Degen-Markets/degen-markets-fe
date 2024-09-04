import { ReactElement } from "react";
import { CardHeading } from "../Card";

const SectionHeader = ({
  icon,
  title,
}: {
  icon?: ReactElement;
  title: string;
}) => (
  <div className="flex space-x-2">
    <CardHeading
      icon={icon}
      bordered={false}
      className="uppercase items-center"
    >
      {title}
    </CardHeading>
  </div>
);

export default SectionHeader;
