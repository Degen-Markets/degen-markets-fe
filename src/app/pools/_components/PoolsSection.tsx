"use client";

import { FC, useState, useEffect, useRef } from "react";
import axios from "axios";
import { PoolsResponse, Pool } from "@/app/lib/utils/types";
import { API_BASE_URL } from "@/app/config/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/Select/Select";
import PoolCard from "@/app/components/PoolCard/PoolCard";
import InfiniteScroll from "react-infinite-scroll-component";
import AnimatedLoading from "@/app/components/AnimatedLoading";

interface PoolsSectionProps {
  initialPools: PoolsResponse;
}

const PoolsSection: FC<PoolsSectionProps> = ({ initialPools }) => {
  const [pools, setPools] = useState<Pool[]>(initialPools);
  const [filters, setFilters] = useState({ status: "", sortBy: "newest" });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const skipInitialFetch = useRef(true);

  const fetchPools = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/pools`, {
        params: {
          status: filters.status,
          sortBy: filters.sortBy,
          limit: 18,
          offset: page * 18,
        },
      });

      const newPools: Array<Pool> = response.data || [];
      if (page === 0) {
        setPools(newPools);
      } else {
        setPools((prevPools) => [...prevPools, ...newPools]);
      }
      setHasMore(newPools.length > 0);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching pools:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value === "*" ? "" : value,
    }));
    resetPools();
  };

  const resetPools = () => {
    setPools([]);
    setPage(0);
    setHasMore(true);
  };

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }
    fetchPools().then();
  }, [filters]);

  return (
    <div className="relative -mt-[100px] lg:-mt-[264px] z-10">
      <div className="flex justify-end space-x-4 mb-8">
        <FilterSelect
          onValueChange={(value) => handleFilterChange("status", value)}
          placeholder="Filter by status"
          options={[
            { value: "*", label: "All Pools" },
            { value: "ongoing", label: "Ongoing" },
            { value: "completed", label: "Completed" },
          ]}
        />
        <FilterSelect
          onValueChange={(value) => handleFilterChange("sortBy", value)}
          placeholder="Sort By"
          options={[
            { value: "newest", label: "Newest" },
            { value: "highestVolume", label: "Highest Volume" },
          ]}
        />
      </div>

      <InfiniteScroll
        style={{ overflow: "initial" }}
        dataLength={pools.length}
        next={fetchPools}
        hasMore={hasMore}
        loader={<AnimatedLoading className="text-white text-center" />}
        endMessage={
          !hasMore && (
            <p className="mt-8 text-sm md:text-base text-lavender-blue text-center">
              No more bets available.
            </p>
          )
        }
      >
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pools.map((pool, index) => (
            <PoolCard pool={pool} key={index} />
          ))}
        </section>
      </InfiniteScroll>
    </div>
  );
};

const FilterSelect = ({
  onValueChange,
  placeholder,
  options,
}: {
  onValueChange: (value: string) => void;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
}) => (
  <Select onValueChange={onValueChange}>
    <SelectTrigger className="w-40">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map(({ value, label }) => (
        <SelectItem value={value} key={value}>
          {label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default PoolsSection;
