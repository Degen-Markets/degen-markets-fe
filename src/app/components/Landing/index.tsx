"use client";
import { useState } from "react";
import { PoolsResponse } from "@/app/lib/utils/types";
import SectionHeader from "./SectionHeading";
import PoolSection from "./PoolSection";
import PoolsIcon from "@/app/components/Icons/PoolsIcon";

const Pools = ({ pools }: { pools: PoolsResponse }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const poolsPerPage = 9;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="hidden md:block">
        <SectionHeader
          icon={<PoolsIcon width={64} height={64} />}
          title="Pools"
        />
      </div>
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
