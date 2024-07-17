import FellowDegens from "@/app/home/_sections/FellowDegens";
import Games from "@/app/home/_sections/Games";
import Activities from "@/app/home/_sections/Activities";

const Home = () => {
  return (
    <div className="flex flex-col text-white">
      <Games />
      <Activities />
      <FellowDegens />
    </div>
  );
};

export default Home;
