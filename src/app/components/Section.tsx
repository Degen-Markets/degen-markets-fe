import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type SectionProps = PropsWithChildren & {
  className?: string;
};
const Section: FC<SectionProps> = ({ children, className }) => {
  return (
    <section
      className={twMerge(
        "md:mx-auto md:max-w-screen-xl lg:max-w-screen-2xl  py-20",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default Section;
