"use client";
import { FC, useState } from "react";
import { Pool, PoolsResponse } from "@/app/lib/utils/types";
import PoolCard from "@/app/components/PoolCard/PoolCard";
import AnimatedLoading from "@/app/components/AnimatedLoading";
import InfiniteScrollContainer from "@/app/components/InfiniteScrollContainer/InfiniteScrollContainer";
import { getPools, SortBy, Status } from "@/app/api/pools";

interface PoolsSectionProps {
  initialPools: Pool[];
}

const PoolsSection: FC<PoolsSectionProps> = ({ initialPools }) => {
  const [filters, setFilters] = useState<Record<string, Status | SortBy>>({
    filter: "ongoing",
    sort: "newest",
  });

  const fetchPools = async (
    page: number,
    filters?: Record<string, Status | SortBy | undefined>,
  ): Promise<PoolsResponse> => {
    const response = await getPools({
      status: filters?.filter as Status,
      sortBy: filters?.sort as SortBy,
      limit: "18",
      offset: (page * 18).toString(),
    });

    return response.data as PoolsResponse;
  };

  const filterOptions = [
    {
      name: "filter",
      label: "Filter",
      options: [
        { value: "*", label: "All Pools" },
        { value: "ongoing", label: "Ongoing" },
        { value: "completed", label: "Completed" },
      ],
    },
    {
      name: "sort",
      label: "Sort",
      options: [
        { value: "newest", label: "Newest" },
        { value: "highestVolume", label: "Highest Volume" },
      ],
    },
  ];

  return (
    <InfiniteScrollContainer
      initialData={initialPools}
      fetchData={fetchPools}
      renderSection={(data) => (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {data.map((pool: Pool, index) => (
            <PoolCard pool={pool} key={index} />
          ))}
        </section>
      )}
      SkeletonLoader={<AnimatedLoading className="text-white text-center" />}
      filters={filters}
      setFilters={setFilters}
      filterOptions={filterOptions}
      containerClassName="relative -mt-[100px] lg:-mt-[264px] z-10"
    />
  );
};

export default PoolsSection;
