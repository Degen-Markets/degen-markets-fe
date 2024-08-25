"use client";
import { Card } from "./components/Card";
import Pagination from "./components/Pagination";

const Home = () => {
  return (
    <div className=" my-20">
      <div className="w-full max-w-6xl mx-auto text-center space-y-10">
        <h1 className="text-5xl md:text-[90px] font-bold leading-none">
          Decentralized Prediction Markets on Solana
        </h1>
        <p className="w-full max-w-4xl mx-auto font-semibold leading-relaxed">
          Make Predictions on Narrative-Driven Events Directly via Twitter.
          Predict Now to Claim YOUR Share of the $306,000 $DGM AirDrop
        </p>
      </div>
      <div className="w-full max-w-7xl mx-auto mt-20">
        <div> @ Pools</div>
        <Card
          className=" bg-no-repeat bg-contain bg-center rounded-xl py-10"
          style={{ backgroundImage: "url(/Lending-Flow.svg)" }}
        >
          <div className="uppercase flex justify-between items-center w-full border-b border-cadet-blue-light pb-1">
            <div>
              <span>@All</span>
              <span>% Elections</span>
            </div>
            <div>View on H</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full place-items-center place-content-center my-20">
            {Array.from({ length: 9 }).map((_, ind) => {
              return (
                <div
                  className="w-full h-60 border rounded-xl center-all"
                  key={ind}
                >
                  {ind}
                </div>
              );
            })}
          </div>
          <Pagination />
        </Card>
      </div>
    </div>
  );
};

export default Home;
