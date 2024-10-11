import Link from "next/link";

const Hero = () => {
  return (
    <section className="text-sm lg:text-lg text-center lg:px-4 mt-10 bg-primary  bg-opacity-50 py-8 lg:py-16 rounded-xl mb-10">
      <div className="p-2 items-center text-white" role="alert">
        <span className="text-left flex-auto">
          Earn points by entering pools{" "}
          <Link href="/" className="font-semibold text-main">
            {" "}
            here{" "}
          </Link>
          , by connecting your X/Twitter account{" "}
          <Link href="/my-profile" className="font-semibold text-main">
            here
          </Link>{" "}
          and sharing our pools on X/Twitter.
        </span>
      </div>
    </section>
  );
};

export default Hero;
