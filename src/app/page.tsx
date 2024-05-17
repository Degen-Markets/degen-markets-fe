import Hero from "@/app/home/_sections/Hero";
import FellowDegens from "@/app/home/_sections/FellowDegens";
import Games from "@/app/home/_sections/Games";

const Home = () => {
  return (
    <div className="flex flex-col text-white">
      <Hero />
      <Games />
      <FellowDegens />
    </div>
  );
};

export default Home;
