import Wrapper from "@/app/components/Wrapper";
import LeaderBoard from "@/app/components/Landing/LeaderBoard";
import Link from "next/link";

export const dynamic = "force-dynamic";

const AirdropPage = async () => {
  return (
    <Wrapper className="flex flex-col gap-16">
      <div className="bg-indigo-900 text-center py-4 lg:px-4 mt-20 ">
        <div
          className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
          role="alert"
        >
          <span className="font-semibold mr-2 text-left flex-auto">
            {" "}
            Earn points by entering pools{" "}
            <Link href="/" className="text-purple-light">
              here
            </Link>
            , by connecting your X/Twitter account{" "}
            <Link href="/my-profile" className="text-purple-light">
              here
            </Link>{" "}
            and sharing our pools on X/Twitter.
          </span>
          <svg
            className="fill-current opacity-75 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
          </svg>
        </div>
      </div>
      <LeaderBoard />
    </Wrapper>
  );
};
export default AirdropPage;
