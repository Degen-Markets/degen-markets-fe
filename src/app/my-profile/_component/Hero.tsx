import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-full px-4 lg:px-16">
      <div className="relative w-full h-[200px] lg:h-[300px]">
        <Image
          src="/profile/hero-profile.jpg"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          className="rounded-4xl -z-10"
        />
      </div>
    </section>
  );
};

export default Hero;
