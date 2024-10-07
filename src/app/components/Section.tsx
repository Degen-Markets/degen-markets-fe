import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type SectionProps = PropsWithChildren & {
  className?: string;
};
const Section: FC<SectionProps> = ({ children, className }) => {
  return <section className={twMerge("py-20", className)}>{children}</section>;
};

export default Section;
