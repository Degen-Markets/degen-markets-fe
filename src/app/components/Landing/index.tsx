"use client";
import { useState } from "react";
import { BsFillPieChartFill } from "react-icons/bs";
import { PoolsResponse } from "@/app/lib/utils/bets/types";
import SectionHeader from "./SectionHeading";
import StatsAndSocials from "./StatsAndSocial";
import PoolSection from "./PoolSection";

const Pools = ({ pools }: { pools: PoolsResponse }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const poolsPerPage = 9;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="my-40">
        <SectionHeader icon={<BsFillPieChartFill size={30} />} title="Pools" />
        <PoolSection
          pools={pools}
          currentPage={currentPage}
          poolsPerPage={poolsPerPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Pools;
