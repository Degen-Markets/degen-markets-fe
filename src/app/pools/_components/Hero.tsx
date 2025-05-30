import { Section } from "@/app/components/Section";
import { Button } from "@/app/components/Button/Button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative bg-primary h-[330px] lg:h-[520px]">
      <Section className="md:text-center z-10 relative">
        <h3 className="md:px-4 lg:px-[20%] text-base lg:text-xl">
          All the bets posted on X are displayed here. To create your own bets,
          visit our X account and interact with the pinned tweet or click the
          button below
        </h3>
        <div className="flex items-center md:justify-center mt-3 lg:mt-6">
          <Link href="/pools/create">
            <Button intent="secondary">Create Bet</Button>
          </Link>
        </div>
      </Section>
      <svg
        className="hidden lg:block w-full absolute -bottom-2 z-10"
        viewBox="0 0 1283 145"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 117L1283 0V145H0V117Z" fill="#0C0C1A" />
      </svg>
      <div
        className="absolute bg-contain top-0 bottom-0 left-0 right-0 opacity-20 "
        style={{ backgroundImage: "url('/patterns/hero.svg')" }}
      ></div>
    </div>
  );
};

export default Hero;
