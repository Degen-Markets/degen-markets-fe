import { FC } from "react";
import { getPlayerById } from "@/app/api/players";
import Wrapper from "@/app/components/Wrapper";
import UserAvatar from "@/app/components/UserAvatar";
import {
  getDisplayNameForAddress,
  formatNumberToSignificantDigits,
} from "@/app/lib/utils/helpers";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import ActivityTable from "@/app/my-profile/_component/ActivityTable";
import Image from "next/image";
import styles from "./styles.module.css";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const PlayerPage: FC<{ params: { id: string } }> = async ({ params }) => {
  const { data: player } = await getPlayerById(params.id);

  if (!player) {
    return notFound();
  }

  const stats = [
    {
      title: "Points Earned",
      value: `${formatNumberToSignificantDigits(player?.points || 0)} Pts`,
    },
    { title: "Profit/Loss", value: "$0" },
    { title: "Total Volume", value: "$0" },
  ];

  const displayUsername = player.twitterUsername
    ? `@${player.twitterUsername}`
    : "@Degen";
  const displayableAddress = getDisplayNameForAddress(player.address);

  return (
    <Wrapper>
      <div className="pt-8 lg:pt-14">
        <div className="group bg-steel-gray rounded-xl mb-10 lg:mb-20 w-full relative overflow-hidden animate-border bg-none hover:[background:linear-gradient(45deg,#212131,#212131,#212131)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,theme(colors.indigo.500)_86%,theme(colors.indigo.300)_90%,theme(colors.indigo.500)_94%,theme(colors.slate.600/.48))_border-box] border border-transparent">
          <Image
            src="/profile/hero-profile.jpg"
            alt="Player background"
            width={1920}
            height={1080}
            className={`w-full absolute group-hover:[animation-play-state:running] ${styles.profileCardImage}`}
          />
          <div className="relative z-10 bg-gradient-to-t from-steel-gray from-80% mt-28 px-4 lg:px-8 pb-4">
            <div className="flex items-center gap-6 my-8">
              <div className="w-32 h-12 relative">
                <UserAvatar
                  src={player.twitterPfpUrl}
                  address={displayableAddress}
                  width={120}
                  height={120}
                  className="rounded-full absolute bottom-0"
                />
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{displayUsername}</h1>
                  {player.twitterUsername && (
                    <Link href={`https://x.com/${player.twitterUsername}`}>
                      <FaXTwitter size={24} />
                    </Link>
                  )}
                </div>

                <p className="text-lavender-blue">
                  Address: {displayableAddress}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 grid-rows-2 grid-flow-col">
              {stats.map(({ title, value }) => (
                <>
                  <p
                    key={`${title}-title`}
                    className="text-sm text-lavender-blue"
                  >
                    {title}
                  </p>
                  <p key={`${title}-value`} className="text-xl font-semibold">
                    {value}
                  </p>
                </>
              ))}
            </div>
          </div>
        </div>
        <ActivityTable />
      </div>
    </Wrapper>
  );
};

export default PlayerPage;
