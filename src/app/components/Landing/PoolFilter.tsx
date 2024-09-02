import { FaMicrosoft, FaSquareXTwitter } from "react-icons/fa6";
import { RiBankFill } from "react-icons/ri";
import Link from "next/link";

const PoolsFilter = () => (
  <div className="uppercase flex justify-between items-center w-full border-b border-cadet-blue-light pb-1">
    <div className="flex items-center space-x-3 md:space-x-8">
      <div className="flex items-center space-x-1">
        <FaMicrosoft className="rounded md:rounded-lg hidden md:block" />
        <span className="drop-shadow-lightText font-bold">ALL</span>
      </div>
      <div className="flex items-center space-x-1">
        <RiBankFill className="rounded-lg relative -top-0.5 w-5 h-5 md:w-7 md:h-7  hidden md:block" />
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
