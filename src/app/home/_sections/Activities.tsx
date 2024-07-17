import RecentActivity from "@/app/components/RecentActivity";

const Activities = () => {
  return (
    <section className="grid grid-cols-3 gap-8">
      <div className="col-span-1">
        <RecentActivity />
      </div>
      <div className="col-span-2"></div>
    </section>
  );
};

export default Activities;
