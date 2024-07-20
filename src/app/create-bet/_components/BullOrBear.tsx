// export default function BullOrBear() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-6 bg-[#2b3a4d] rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-white mb-4">BULL OR BEAR</h2>
//         <div className="flex justify-between items-center mb-4">
//           <span className="text-white">Duration</span>
//           <span className="text-white flex items-center">
//             6 Hours
//             <ClockIcon className="ml-2 w-5 h-5 text-white" />
//           </span>
//         </div>
//         <div className="p-4 bg-[#1f2a3a] rounded-lg mb-4">
//           <div className="flex items-center mb-4">
//             <SearchIcon className="w-5 h-5 text-gray-400 absolute ml-3" />
//             <input
//               type="text"
//               placeholder="Search tokens"
//               className="w-full pl-10 pr-4 py-2 rounded-md bg-white text-gray-700 focus:outline-none"
//             />
//           </div>
//           <div className="flex items-center justify-between mb-4">
//             <span className="text-white">Input Amount</span>
//             <input
//               type="text"
//               value="10,5"
//               className="w-20 pl-2 pr-2 py-2 rounded-md bg-[#2b3a4d] text-white focus:outline-none"
//             />
//           </div>
//           <div className="flex justify-between">
//             <button className="w-full mr-2 py-2 bg-[#2ecc71] text-white font-bold rounded-md">BET UP</button>
//             <button className="w-full ml-2 py-2 bg-[#e74c3c] text-white font-bold rounded-md">BET DOWN</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

function ClockIcon({ ...props }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function SearchIcon({ ...props }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon({ ...props }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

//

import React, { useState } from "react";
// import { Crown, Clock, Search } from 'lucide-react';

const RecentActivityItem = ({ text }: { text: string }) => (
  <div className="flex items-center justify-between bg-gray-800 rounded-lg p-2 mb-2">
    <div className="flex items-center">
      <img
        src="/api/placeholder/30/30"
        alt="Avatar"
        className="w-6 h-6 rounded-full mr-2"
      />
      <span className="text-sm text-gray-300">{text}</span>
    </div>
    <button className="bg-orange-500 text-white text-xs py-1 px-2 rounded">
      BET DOWN
    </button>
  </div>
);

const BullOrBearLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex h-screen bg-gray-900 text-white p-4">
      <div className="flex-1 mr-4">
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex justify-between mb-4">
            <div className="flex space-x-2">
              <button className="bg-yellow-500 text-black px-3 py-1 rounded-full flex items-center">
                <SearchIcon size={16} className="mr-1" />
                LITE
              </button>
              <button className="bg-gray-700 px-3 py-1 rounded-full flex items-center">
                <XIcon size={16} className="mr-1 text-yellow-500" />
                PRO
              </button>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-4">BULL OR BEAR</h2>
          <div className="flex items-center mb-4">
            <ClockIcon size={16} className="mr-2" />
            <span>Duration</span>
            <span className="ml-auto">6 Hours</span>
          </div>
          <div className="relative mb-4">
            <SearchIcon
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search tokens"
              className="w-full bg-gray-700 rounded-lg py-2 pl-10 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="flex-1 bg-green-500 py-2 rounded-lg">
              BET UP
            </button>
            <button className="flex-1 bg-orange-500 py-2 rounded-lg">
              BET DOWN
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        {[...Array(5)].map((_, index) => (
          <RecentActivityItem key={index} text="Player's prize to go up..." />
        ))}
      </div>
    </div>
  );
};

export default BullOrBearLayout;
