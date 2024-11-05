"use client";

import { PLAYERS_PER_PAGE } from "./constants";

const PlayerSkeletonLoader = () => {
  const rows = Array.from({ length: PLAYERS_PER_PAGE });

  return (
    <table className="w-full text-sm lg:text-base mt-10 lg:mt-20">
      <tbody>
        {rows.map((_, index) => (
          <tr
            key={index}
            className="text-sm lg:text-base border-b-4 border-b-main bg-steel-gray rounded-lg animate-pulse"
          >
            <th className="px-2 lg:px-6 py-2 font-medium whitespace-nowrap">
              <div className="flex items-center gap-1">
                <div className="bg-gray-400 rounded-full h-6 w-6"></div>
                <span className="h-4 w-6 bg-gray-400 rounded"></span>
              </div>
            </th>
            <td className="px-2 lg:px-6 py-2">
              <div className="flex gap-3 items-center">
                <div className="h-8 w-8 lg:w-12 lg:h-12 bg-gray-400 rounded-full"></div>
                <div className="h-4 w-24 bg-gray-400 rounded"></div>
              </div>
            </td>
            <td className="px-2 lg:px-6 py-2">
              <div className="h-4 w-12 bg-gray-400 rounded"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlayerSkeletonLoader;
