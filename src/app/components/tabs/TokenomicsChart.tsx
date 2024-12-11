"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TokenAllocation {
  name: string;
  percentage: number;
  description: string;
  color: string;
}

interface TokenomicsChartProps {
  totalSupply: string;
  allocations: TokenAllocation[];
}

const TokenomicsChart: React.FC<TokenomicsChartProps> = ({
  totalSupply,
  allocations,
}) => {
  const chartData = {
    labels: allocations.map((a) => a.name),
    datasets: [
      {
        data: allocations.map((a) => a.percentage),
        backgroundColor: allocations.map((a) => a.color),
        borderColor: "#fff",
        borderWidth: 2,
        offset: 2,
        hoverOffset: 30,
      },
    ],
  };

  const chartOptions: ChartOptions<"pie"> = {
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: "white",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    radius: "90%",
    rotation: -45,
  };

  const calculateTokenAmount = (percentage: number): string => {
    const total = 1_000_000_000;
    return (total * (percentage / 100)).toLocaleString();
  };

  return (
    <>
      <h2 className="text-2xl mb-6 font-bold">Tokenomics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className=" rounded-lg relative lg:col-span-2">
          <div className="w-full h-full flex items-center justify-center relative">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="space-y-6 lg:col-span-1">
          <div className="bg-[#1A1F24] p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Total Supply</span>
              <span className="text-xl font-semibold">{totalSupply}</span>
            </div>
            <div className="text-sm text-gray-400 mt-2">
              Initial circulation: 40% ({calculateTokenAmount(40)} $AI)
            </div>
          </div>

          {allocations.map((allocation, index) => (
            <div
              key={index}
              className="bg-[#1A1F24] p-4 rounded-lg transition-transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: allocation.color }}
                  />
                  <span className="font-medium">{allocation.name}</span>
                </div>
                <div className="text-right">
                  <div
                    className="text-lg font-bold"
                    style={{ color: allocation.color }}
                  >
                    {allocation.percentage}%
                  </div>
                  <div className="text-sm text-gray-400">
                    {calculateTokenAmount(allocation.percentage)} $AI
                  </div>
                </div>
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
    </>
  );
};

export default TokenomicsChart;
