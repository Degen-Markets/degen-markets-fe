import type { Metadata } from "next";
import Wrapper from "@/app/components/Wrapper";
import BlinkLoader from "@/app/pools/[id]/BlinkLoader";
import { getPoolById } from "@/app/api/pools";
import { ACTION_API_URL } from "@/app/config/api";

const PoolPage = async ({ params: { id } }: { params: { id: string } }) => {
  const isCreateBet = id === "create";
  const {
    data: { value },
  } = isCreateBet ? { data: { value: undefined } } : await getPoolById(id);

  return (
    <Wrapper className="flex justify-center">
      <div className="w-full md:w-3/6 lg:w-2/6 text-lg mt-4 lg:mt-8">
        {/* {!isCreateBet && <ShareOnTwitterBanner poolId={id} />} */}
        <BlinkLoader poolId={id} poolValue={value} />
      </div>
    </Wrapper>
  );
};

export default PoolPage;

const replaceGifExtension = (imageUrl: string) => {
  return imageUrl.replace(".gif", ".png");
};

export const generateMetadata = async ({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const poolCreationForm = {
    data: {
      title: "Create a new bet",
      description: "Enter the details for your bet",
      image:
        "https://degen-markets-static.s3.eu-west-1.amazonaws.com/degen-markets-banner.jpeg",
      address: "create",
    },
  };
  const { data: pool } =
    id === "create" ? poolCreationForm : await getPoolById(id);
  return {
    title: pool.title,
    description: pool.description,
    openGraph: {
      type: "website",
      title: pool.title,
      images: [replaceGifExtension(pool.image)],
      url: `${ACTION_API_URL}/pools/${pool.address}`,
    },
    twitter: {
      card: "summary_large_image",
      title: pool.title,
      description: pool.description,
      images: [replaceGifExtension(pool.image)],
      site: "@DEGEN_MARKETS", // our X/Twitter account
    },
  };
};
