import { FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";
import AllIcon from "@/app/components/Icons/AllIcon";
import ElectionIcon from "@/app/components/Icons/ElectionIcon";

const PoolsFilter = () => (
  <div className="uppercase flex justify-between items-center w-full border-b border-cadet-blue-light pb-1 mb-10">
    <div className="flex items-center space-x-3 md:space-x-8">
      <div className="flex items-center space-x-1">
        <AllIcon width="32" height="32" />
        <span className="drop-shadow-lightText font-bold">ALL</span>
      </div>
      <div className="flex items-center space-x-1">
        <ElectionIcon width="32" height="32" />
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
