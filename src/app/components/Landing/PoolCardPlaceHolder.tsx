import React from "react";

const PoolCardPlaceHolder = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, ind) => (
        <div
          className="w-full h-60 bg-blue-light text-5xl text-cadet-blue-light cursor-default font-bold flex justify-center items-center bg-opacity-50 rounded-xl select-none"
          key={ind}
        >
          D
        </div>
      ))}
    </>
  );
};

export default PoolCardPlaceHolder;
