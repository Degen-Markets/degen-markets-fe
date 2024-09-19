import Wrapper from "@/app/components/Wrapper";
import LeaderBoard from "@/app/components/Landing/LeaderBoard";
import Link from "next/link";

export const dynamic = "force-dynamic";

const AirdropPage = async () => {
  return (
    <Wrapper className="flex flex-col gap-16">
      <section className="pt-20 text-center text-xl">
        Earn points by entering pools{" "}
        <Link
          href="/"
          className="border-b-2 border-b-purple-medium text-purple-light"
        >
          here
        </Link>
        , by connecting your X/Twitter account{" "}
        <Link
          href="/my-profile"
          className="border-b-2 border-b-purple-medium text-purple-light"
        >
          here
        </Link>{" "}
        and sharing our pools on X/Twitter.
      </section>
      <LeaderBoard />
    </Wrapper>
  );
};
export default AirdropPage;
