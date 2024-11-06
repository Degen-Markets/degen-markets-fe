const PlayerSkeletonLoader = () => {
  const rows = Array.from({ length: 10 });

  return (
    <div className="w-full text-sm lg:text-base">
      <div>
        {rows.map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-5 lg:text-base border-b-4 border-b-main bg-steel-gray animate-pulse items-center"
          >
            <div className="px-2 lg:px-6 py-2 font-medium col-span-1 flex justify-start">
              <div className="flex items-center gap-2">
                <div className="bg-gray-400 rounded-full h-6 w-6"></div>
                <span className="h-4 w-6 bg-gray-400 rounded"></span>
              </div>
            </div>
            <div className="px-2 lg:px-6 py-2 col-span-3 flex justify-start">
              <div className="flex gap-3 items-center">
                <div className="h-8 w-8 lg:w-12 lg:h-12 bg-gray-400 rounded-full"></div>
                <div className="h-4 w-24 bg-gray-400 rounded"></div>
              </div>
            </div>
            <div className=" py-2 col-span-1 flex justify-start">
              <div className="h-4 w-12 bg-gray-400 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerSkeletonLoader;
