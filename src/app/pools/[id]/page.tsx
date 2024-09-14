import type { Metadata } from "next";
import Wrapper from "@/app/components/Wrapper";
import BlinkLoader from "@/app/pools/[id]/BlinkLoader";
import { getPoolById } from "@/app/lib/utils/api/pools";

const PoolPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <Wrapper className="flex justify-center">
      <div className="w-full md:w-2/6 text-lg">
        <BlinkLoader poolId={id} />
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
  const { data: pool } = await getPoolById(id);
  const cleanImageUrl = replaceGifExtension(pool.image);
  return {
    title: pool.title,
    description: pool.description,
    openGraph: {
      type: "website",
      title: pool.title,
      images: [cleanImageUrl],
      url: `https://degenmarkets.com/pools/${pool.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: pool.title,
      description: pool.description,
      images: [cleanImageUrl],
      site: "@DEGEN_MARKETS", // our X/Twitter account
    },
  };
};
