"use client";
import { useState } from "react";
import { PoolsResponse } from "@/app/lib/utils/bets/types";
import SectionHeader from "./SectionHeading";
import PoolSection from "./PoolSection";
import Image from "next/image";

const Pools = ({ pools }: { pools: PoolsResponse }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const poolsPerPage = 9;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <SectionHeader
        icon={
          <Image
            src="/icons/pools-icon.svg"
            width={64}
            height={64}
            alt="poolc icon"
            className="w-10 md:w-16"
          />
        }
        title="Pools"
      />
      <PoolSection
        pools={pools}
        currentPage={currentPage}
        poolsPerPage={poolsPerPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Pools;
