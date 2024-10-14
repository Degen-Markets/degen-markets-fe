import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-full px-8">
      <div className="relative w-full h-[200px] lg:h-[319px]">
        <Image
          src="/profile/profile-hero.jpg"
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
