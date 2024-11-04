import { FC } from "react";
import { getPlayerById } from "@/app/api/players";
import Wrapper from "@/app/components/Wrapper";
import ActivityTable from "@/app/my-profile/_component/ActivityTable";
import { notFound } from "next/navigation";
import ProfileStats from "./_component/ProfileStats";

export const dynamic = "force-dynamic";

const PlayerPage: FC<{ params: { id: string } }> = async ({ params }) => {
  const player = await getPlayerById(params.id);

  if (!player) {
    return notFound();
  }

  return (
    <Wrapper>
      <div className="pt-8 lg:pt-14">
        <ProfileStats player={player} />
        <ActivityTable />
      </div>
    </Wrapper>
  );
};

export default PlayerPage;
