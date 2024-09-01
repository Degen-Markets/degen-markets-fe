import { PoolsResponse } from "@/app/lib/utils/bets/types";
import PoolsFilter from "./PoolFilter";
import PoolCardPlaceHolder from "./PoolCardPlaceHolder";
import PoolsGrid from "./PoolGrid";
import Pagination from "../Pagination";

const PoolSection = ({
  pools,
  currentPage,
  poolsPerPage,
  handlePageChange,
}: {
  pools: PoolsResponse;
  currentPage: number;
  poolsPerPage: number;
  handlePageChange: (page: number) => void;
}) => {
  const displayedPools = pools.slice(
    (currentPage - 1) * poolsPerPage,
    currentPage * poolsPerPage,
  );
  const placeholdersCount = poolsPerPage - displayedPools.length;
  const totalPages = Math.ceil(pools.length / poolsPerPage);

  return (
    <div
      className="bg-black-medium bg-opacity-90 p-10 bg-no-repeat bg-contain bg-center rounded-xl py-10 mb-20"
      style={{ backgroundImage: "url(/Lending-Flow.svg)" }}
    >
      <PoolsFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full place-items-center place-content-center my-20">
        <PoolsGrid pools={displayedPools} />
        <PoolCardPlaceHolder count={placeholdersCount} />
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PoolSection;
