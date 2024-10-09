import { Section } from "@/app/components/Section";
import { PoolsResponse } from "@/app/lib/utils/types";
import { FC } from "react";
import PoolCard from "@/app/components/PoolCard.tsx/PoolCard";

interface PoolsSectionProps {
  pools: PoolsResponse;
}

const PoolsSection: FC<PoolsSectionProps> = ({ pools }) => {
  return (
    <div className="relative -mt-[200px] lg:-mt-[320px]">
      <Section className="grid lg:grid-cols-3 gap-8 ">
        {pools.map((pool, index) => (
          <PoolCard pool={pool} key={index} />
        ))}
      </Section>
    </div>
  );
};

export default PoolsSection;
