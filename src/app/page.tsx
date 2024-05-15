import Hero from "@/app/home/_sections/Hero";
import FellowDegens from "@/app/home/_sections/FellowDegens";

const Home = () => {
  return (
    <div className=" flex flex-col items-center justify-center text-white">
      <Hero />
      <FellowDegens />
    </div>
  );
};

export default Home;
