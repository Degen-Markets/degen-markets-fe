import React from "react";

interface TokenAllocation {
  name: string;
  percentage: number;
  description: string;
  color: string;
}

interface TokenomicsProps {
  totalSupply: string;
  allocations: TokenAllocation[];
}

const Tokenomics: React.FC<TokenomicsProps> = ({
  totalSupply,
  allocations,
}) => {
  return (
    <div className="p-8 text-white ">
      <h2 className="text-2xl mb-6 font-bold">Tokenomics</h2>

      <div className="mb-8">
        <div className="flex items-center justify-between bg-[#1A1F24] p-4 rounded-lg">
          <span className="text-gray-400">Total Supply</span>
          <span className="text-xl font-semibold">{totalSupply}</span>
        </div>
      </div>

      <div className="grid gap-4">
        {allocations.map((allocation, index) => (
          <div
            key={index}
            className="bg-[#1A1F24] p-4 rounded-lg transition-transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{allocation.name}</span>
              <span
                className="text-lg font-bold"
                style={{ color: allocation.color }}
              >
                {allocation.percentage}%
              </span>
            </div>
            <div className="w-full bg-[#0D1117] rounded-full h-2 mb-3">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${allocation.percentage}%`,
                  backgroundColor: allocation.color,
                }}
              />
            </div>
            <p className="text-sm text-gray-400">{allocation.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Tokenomics;
