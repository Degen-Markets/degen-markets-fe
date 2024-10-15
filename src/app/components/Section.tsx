import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type SectionProps = PropsWithChildren<{
  className?: string;
}>;

export const Section: FC<SectionProps> = ({ children, className }) => (
  <section
    className={twMerge(
      "md:mx-auto md:max-w-screen-xl lg:max-w-screen-2xl px-4 lg:px-12 py-10 lg:py-20 last:pb-0 last:lg:pb-0",
      className,
    )}
  >
    {children}
  </section>
);

type SectionHeadlineProps = PropsWithChildren<{
  className?: string;
  subHeadline?: string;
}>;

export const SectionHeadline: FC<SectionHeadlineProps> = ({
  children,
  className,
  subHeadline,
}) => (
  <header className="mb-6 md:mb-16">
    <h2 className={twMerge("inline-block relative text-4xl", className)}>
      <span className="relative">
        {children}
        <svg
          className="absolute text-white w-[66px] lg:w-[101px] right-0 -bottom-2 lg:-bottom-4"
          aria-hidden="true"
          role="presentation"
          viewBox="0 0 101 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 3.26041C27.8714 -1.06193 67.0473 2.37336 100 1.15395M70.7714 8C77.1357 7.04605 80.4357 8 87.0357 8"
            stroke="#FFDEAA"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </h2>
    {subHeadline && (
      <p className="text-base text-lavender-blue mt-6">{subHeadline}</p>
    )}
  </header>
);
