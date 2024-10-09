import { Section } from "@/app/components/Section";

const Hero = () => {
  return (
    <div className="relative bg-primary h-[320px] lg:h-[520px]">
      <Section className="text-center">
        <p className="px-4 lg:px-[20%]">
          All the bets posted on X are displayed here. To create your own bets,
          visit our X account and interact with the pinned tweet.
        </p>
      </Section>
      <svg
        className="w-full absolute -bottom-2"
        viewBox="0 0 1283 145"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 117L1283 0V145H0V117Z" fill="#0C0C1A" />
      </svg>
    </div>
  );
};

export default Hero;
