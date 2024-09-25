import type { Metadata } from "next";
import Wrapper from "@/app/components/Wrapper";
import BlinkLoader from "@/app/pools/[address]/BlinkLoader";
import { getPoolById } from "@/app/lib/utils/api/pools";

const PoolPage = ({ params: { address } }: { params: { address: string } }) => {
  return (
    <Wrapper className="flex justify-center">
      <div className="w-full md:w-2/6 text-lg">
        <BlinkLoader poolId={address} />
      </div>
    </Wrapper>
  );
};

export default PoolPage;

const replaceGifExtension = (imageUrl: string) => {
  return imageUrl.replace(".gif", ".png");
};

export const generateMetadata = async ({
  params: { address },
}: {
  params: { address: string };
}): Promise<Metadata> => {
  const { data: pool } = await getPoolById(address);
  return {
    title: pool.title,
    description: pool.description,
    openGraph: {
      type: "website",
      title: pool.title,
      images: [replaceGifExtension(pool.image)],
      url: `https://degenmarkets.com/pools/${pool.address}`,
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
