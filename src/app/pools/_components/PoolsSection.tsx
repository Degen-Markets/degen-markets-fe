"use client";
import { FC, useState } from "react";
import axios from "axios";
import { Pool } from "@/app/lib/utils/types";
import { API_BASE_URL } from "@/app/config/api";
import PoolCard from "@/app/components/PoolCard/PoolCard";
import AnimatedLoading from "@/app/components/AnimatedLoading";
import InfiniteScrollContainer from "@/app/components/InfiniteScrollContainer/InfiniteScrollContainer";

interface PoolsSectionProps {
  initialPools: Pool[];
}

const PoolsSection: FC<PoolsSectionProps> = ({ initialPools }) => {
  const [filters, setFilters] = useState<Record<string, string>>({
    filter: "",
    sort: "newest",
  });

  const fetchPools = async (page: number, filters?: Record<string, string>) => {
    const response = await axios.get(`${API_BASE_URL}/pools`, {
      params: {
        status: filters?.filter,
        sortBy: filters?.sort,
        limit: 18,
        offset: page * 18,
      },
    });
    return response.data || [];
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
