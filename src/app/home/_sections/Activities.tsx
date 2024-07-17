import RecentActivity from "@/app/components/RecentActivity";

const Activities = () => {
  return (
    <section className="grid grid-cols-2 gap-32">
      <div className="col-span-1">
        <RecentActivity />
      </div>
      <div className="col-span-1"></div>
    </section>
  );
};

export default Activities;
