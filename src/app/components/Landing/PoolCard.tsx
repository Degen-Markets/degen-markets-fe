import { Pool } from "@/app/lib/utils/types";
import { Button } from "../Button/Button";
import Link from "next/link";

const PoolCard = ({ pool }: { pool: Pool }) => {
  const link = `/pools/${pool.address}`;
  return (
    <div
      className="z-1 group relative w-full h-60 bg-blue-light rounded-xl center-all text-center p-4 bg-cover bg-center bg-opacity-50 bg-no-repeat hover:scale-105 hover:shadow transition-all ease duration-300"
      style={{ backgroundImage: `url('${pool?.image}')` }}
    >
      <div className="absolute inset-0 bg-black-main bg-opacity-70 group-hover:bg-opacity-0 rounded-xl -z-1 transition-all ease duration-300" />
      <div className="z-10">
        <h2 className="font-bold group-hover:opacity-0 transition-all ease duration-300 pointer-events-none">
          {pool.title}
        </h2>
        <Link href={link}>
          <Button
            size="regular"
            className="bg-opacity-90 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all ease duration-300"
          >
            Bet Now
          </Button>
        </Link>
      </div>

      <Link
        // this overlays on the whole div (but only on mobile) and navigates to pool page when you click on the wrapping div
        href={link}
        className="block md:hidden absolute top-0 left-0 w-full h-full z-10"
      ></Link>
    </div>
  );
};

export default PoolCard;
