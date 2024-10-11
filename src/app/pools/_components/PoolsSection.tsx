import { PoolsResponse } from "@/app/lib/utils/types";
import { FC } from "react";
import PoolCard from "@/app/components/PoolCard.tsx/PoolCard";

interface PoolsSectionProps {
  pools: PoolsResponse;
}

const PoolsSection: FC<PoolsSectionProps> = ({ pools }) => {
  return (
    <div className="relative -mt-[132px] lg:-mt-[264px] z-10">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        {pools.map((pool, index) => (
          <PoolCard pool={pool} key={index} />
        ))}
      </section>
    </div>
  );
};

export default PoolsSection;
