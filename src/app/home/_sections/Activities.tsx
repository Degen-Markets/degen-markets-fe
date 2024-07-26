import RecentActivity from "@/app/components/RecentActivity/RecentActivity";
import TopPlayers from "@/app/home/_sections/TopPlayers";

const Activities = () => {
  return (
    <section className="grid lg:grid-cols-2 gap-8">
      <div className="col-span-1">
        <RecentActivity />
      </div>
      <div className="col-span-1">
        <TopPlayers />
      </div>
    </section>
  );
};

export default Activities;
