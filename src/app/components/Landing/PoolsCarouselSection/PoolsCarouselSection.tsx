"use client";

import { PoolsResponse } from "@/app/lib/utils/types";
import { FC } from "react";
import PoolCard from "@/app/components/PoolCard.tsx/PoolCard";
import { Section, SectionHeadline } from "@/app/components/Section";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { Button } from "@/app/components/Button/Button";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/app/components/Landing/PoolsCarouselSection/CarouselArrowButtons";
import Link from "next/link";
import CreateBetButton from "../../Button/CreateBetButton";
import CreateBetIconButton from "../../Button/CreateBetIconButton";

interface PoolsCarouselSectionProps {
  pools: PoolsResponse;
}

const PoolsCarouselSection: FC<PoolsCarouselSectionProps> = ({ pools }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      containScroll: "trimSnaps",
    },
    [WheelGesturesPlugin()],
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <Section className="overflow-hidden">
      <div className="flex justify-between items-center w-full">
        <SectionHeadline>Pools</SectionHeadline>
        <CreateBetButton
          intent="secondary"
          size="small"
          className="justify-end mb-5 md:mb-14 hidden md:flex"
        />
        <CreateBetIconButton
          intent="secondary"
          size="small"
          className="justify-end mb-5 md:mb-14 flex md:hidden"
        />
      </div>
      <div ref={emblaRef} className="mb-3 lg:mb-6">
        <div className="flex gap-6">
          {pools.map((pool, index) => (
            <div
              className="flex-[0_0_100%] sm:flex-[0_0_calc(100%/2)] md:flex-[0_0_calc(100%/3.5)]"
              key={index}
            >
              <PoolCard pool={pool} className="h-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4 justify-end mr-[10%] mb-6 lg:mb-12">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
      <div className="flex flex-col items-center space-y-8">
        <p className="text-lavender-blue text-sm lg:text-base mx-[5%] lg:mx-[20%] text-center">
          You can explore more bets or create a new one by checking the
          available blinks in the list. Simply browse through the current blinks
          to see all of them, or click the option to create a new blink
        </p>
        <Link href="/pools">
          <Button intent="outline">See more</Button>
        </Link>
      </div>
    </Section>
  );
};

export default PoolsCarouselSection;
