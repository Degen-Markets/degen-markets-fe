import { FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

const PoolsFilter = () => (
  <div className="uppercase flex justify-between items-center w-full border-b border-cadet-blue-light pb-1 mb-10">
    <div className="flex items-center space-x-3 md:space-x-8">
      <div className="flex items-center space-x-1">
        <Image
          src="/icons/all-filter-icon.svg"
          width={32}
          height={32}
          alt="All Filter"
        />
        <span className="drop-shadow-lightText font-bold">ALL</span>
      </div>
      <div className="flex items-center space-x-1">
        <Image
          src="/icons/elections-icon.svg"
          width={48}
          height={48}
          alt="All Filter"
        />
        <span className="drop-shadow-lightText font-bold">Elections</span>
      </div>
    </div>
    <Link
      className="flex items-center space-x-2 "
      href="https://x.com/DEGEN_MARKETS"
      target="_blank"
    >
      <span className="drop-shadow-lightText font-bold">View on</span>
      <FaSquareXTwitter />
    </Link>
  </div>
);

export default PoolsFilter;
