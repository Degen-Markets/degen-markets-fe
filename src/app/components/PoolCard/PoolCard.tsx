"use client";
import Image from "next/image";
import { FC, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { Button } from "@/app/components/Button/Button";
import { Badge } from "@/app/components/Badge/Badge";
import ClaimPoolTweetPointsDialog from "@/app/pools/[id]/ClaimPoolTweetPointsDialog";

import { Pool } from "@/app/lib/utils/types";
import { useUserProfileContext } from "@/app/context/UserProfileContext";
import isWithinTwoWeeks from "@/app/lib/utils/isWithinTwoWeeks";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

interface PoolCardProps {
  pool: Pool;
  className?: string;
  showBadge?: boolean;
}

const PoolCard: FC<PoolCardProps> = ({
  pool,
  className,
  showBadge = false,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { userProfile } = useUserProfileContext();

  // const openDialog = useCallback(() => setDialogOpen(true), []);
  const closeDialog = useCallback(() => setDialogOpen(false), []);

  // const { handleShare } = useShareOnTwitterFlow({
  //   poolId: pool.address,
  //   openDialog,
  // });

  const poolValue = Number(pool.value) / LAMPORTS_PER_SOL;

  const badgeDetails = useMemo(() => {
    if (poolValue > 0.5) {
      return { className: "text-danger", text: "Hot" };
    }
    if (isWithinTwoWeeks(pool.createdAt)) {
      return { className: "text-success", text: "New" };
    }
    return { className: "", text: "" };
  }, [poolValue, pool.createdAt]);

  const shouldDisplayBadge =
    showBadge &&
    (poolValue > 0.5 || isWithinTwoWeeks(pool.createdAt)) &&
    !pool.isPaused;
  const poolLink = `/pools/${pool.address}`;

  return (
    <div
      className={twMerge(
        "relative flex bg-steel-gray flex-col h-full p-4 lg:p-8  rounded-lg lg:rounded-2xl [background:linear-gradient(45deg,#212131,#212131,#212131)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,theme(colors.indigo.500)_86%,theme(colors.indigo.300)_90%,theme(colors.indigo.500)_94%,theme(colors.slate.600/.48))_border-box] hover:border border-transparent animate-border transform transition duration-300 hover:scale-105",
        className,
      )}
    >
      {shouldDisplayBadge && (
        <Badge
          className={twMerge(
            "z-10 absolute left-0 top-12 rounded-l-none pr-4",
            badgeDetails.className,
          )}
        >
          {badgeDetails.text}
        </Badge>
      )}

      <Link href={poolLink} className="relative h-56 lg:h-96 mb-4">
        <Image
          src={pool.image}
          alt={pool.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </Link>

      <h3 className="font-semibold text-base mb-2">{pool.title}</h3>
      <p className="text-lavender-blue text-sm mb-4 flex-grow break-words">
        {pool.description}
      </p>

      <div className="flex gap-4 justify-end mt-6">
        <Link href={poolLink}>
          <Button size="small" intent="primary">
            {pool.isPaused ? "Claim Win" : "Bet Now"}
          </Button>
        </Link>
        {/* <Button size="small" intent="outlineWhite" onClick={handleShare}>
          Share for points
        </Button> */}
      </div>

      {isDialogOpen && userProfile?.address && (
        <ClaimPoolTweetPointsDialog
          poolId={pool.address}
          isOpen={isDialogOpen}
          userAddress={userProfile.address}
          onClose={closeDialog}
        />
      )}
    </div>
  );
};

export default PoolCard;
