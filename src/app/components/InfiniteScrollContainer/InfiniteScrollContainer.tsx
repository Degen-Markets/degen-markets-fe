import {
  useState,
  useEffect,
  useRef,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterSelect from "./FilterSelect";

interface InfiniteScrollContainerProps<T, F> {
  initialData: T[];
  fetchData: (page: number, filters?: F) => Promise<T[]>;
  renderSection: (data: T[]) => ReactNode;
  SkeletonLoader: ReactNode;
  filters?: F;
  setFilters?: Dispatch<SetStateAction<F>>;
  filterOptions?: Array<{
    name: keyof F;
    options: Array<{ value: string; label: string }>;
  }>;
  containerClassName?: string;
}

const InfiniteScrollContainer = <T, F>({
  initialData,
  fetchData,
  renderSection,
  SkeletonLoader,
  filters,
  setFilters,
  filterOptions = [],
  containerClassName,
}: InfiniteScrollContainerProps<T, F>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const skipInitialFetch = useRef(true);

  const fetchMoreData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newData = await fetchData(page, filters);
      setData((prevData) => (page === 0 ? newData : [...prevData, ...newData]));
      setHasMore(newData.length > 0);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name: keyof F, value: string) => {
    if (setFilters) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value === "*" ? "" : value,
      }));
      resetData();
    }
  };

  const resetData = () => {
    setData([]);
    setPage(0);
    setHasMore(true);
  };

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }
    fetchMoreData();
  }, [filters]);

  return (
    <div className={containerClassName}>
      {filters && setFilters && filterOptions.length > 0 && (
        <div className="flex justify-end space-x-4 mb-8">
          {filterOptions.map(({ name, options }) => (
            <FilterSelect
              key={name.toString()}
              onValueChange={(value) => handleFilterChange(name, value)}
              placeholder={`Filter by ${name.toString()}`}
              options={options}
            />
          ))}
        </div>
      )}

      <InfiniteScroll
        style={{ overflow: "initial" }}
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={SkeletonLoader}
        endMessage={
          !hasMore && (
            <p className="mt-8 text-sm md:text-base text-lavender-blue text-center">
              No more data available.
            </p>
          )
        }
      >
        {renderSection(data)}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollContainer;
