import Image from "next/image";
import { Button } from "@/app/components/Button/Button";
import { Pool } from "@/app/lib/utils/types";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface PoolCardProps {
  pool: Pool;
  className?: string;
}

const PoolCard: FC<PoolCardProps> = ({ pool, className }) => {
  const link = `/pools/${pool.address}`;
  return (
    <div
      className={twMerge(
        "flex bg-steel-gray flex-col h-full p-4 lg:p-8  rounded-lg lg:rounded-2xl [background:linear-gradient(45deg,#212131,#212131,#212131)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,theme(colors.indigo.500)_86%,theme(colors.indigo.300)_90%,theme(colors.indigo.500)_94%,theme(colors.slate.600/.48))_border-box] hover:border border-transparent animate-border transform transition duration-300 hover:scale-105",
        className,
      )}
    >
      <div className="h-56 lg:h-96 relative mb-4">
        <Link href={link}>
          <Image
            src={pool.image}
            alt={pool.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </Link>
      </div>
      <h3 className="font-semibold text-base mb-2">{pool.title}</h3>
      <p className="text-lavender-blue text-sm mb-4 flex-grow text-wrap">
        {pool.description}
      </p>
      <div className="flex gap-4 justify-end mt-6">
        <Link href={link}>
          <Button size="small" intent="primary">
            {pool.isPaused ? "Claim Win" : "Bet Now"}
          </Button>
        </Link>
        <Button size="small" intent="outlineWhite">
          Share
        </Button>
      </div>
    </div>
  );
};

export default PoolCard;
