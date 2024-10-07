"use client";

import { PoolsResponse } from "@/app/lib/utils/types";
import { FC } from "react";
import PoolCard from "@/app/components/PoolCard.tsx/PoolCard";
import Section from "@/app/components/Section";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

interface PoolsCarouselSectionProps {
  pools: PoolsResponse;
}
const PoolsCarouselSection: FC<PoolsCarouselSectionProps> = ({ pools }) => {
  const [emblaRef] = useEmblaCarousel(
    {
      align: "start",
      containScroll: "trimSnaps",
      skipSnaps: true,
      watchDrag: pools.length > 3,
    },
    [WheelGesturesPlugin()],
  );

  return (
    <Section className="overflow-hidden">
      <div ref={emblaRef}>
        <div className="flex gap-6">
          {pools.map((pool, index) => (
            <PoolCard key={index} pool={pool} className="w-96" />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default PoolsCarouselSection;
