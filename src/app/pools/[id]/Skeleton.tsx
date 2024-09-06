const Skeleton = () => {
  return (
    <div className="w-full cursor-default overflow-hidden rounded-2xl border border-gray-600 bg-white bg-opacity-5 shadow-md animate-pulse">
      <div className="flex flex-col p-5">
        <div className="flex w-full bg-gray-600 rounded-md h-64 mb-4"></div>
        <div className="flex bg-gray-600 h-1 w-1/3 mb-1"></div>
        <div className="flex bg-gray-600 h-1 w-2/3 mb-1"></div>
        <div className="flex bg-gray-600 h-1 w-full mb-4"></div>
        <div className="flex bg-gray-600 h-8 w-full rounded-full mb-2"></div>
        <div className="flex bg-gray-600 h-8 w-full rounded-full"></div>
      </div>
    </div>
  );
};

export default Skeleton;
