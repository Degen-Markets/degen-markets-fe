// src/App.tsx
import React from "react";

const ProfileLayout: React.FC = () => {
  return (
    <div className="bg-gray-800 min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Section */}
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="/path-to-avatar.png"
                alt="avatar"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <div className="text-lg font-bold">ghosthash1</div>
                <div className="text-sm">0x53...d887a</div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="bg-blue-500 p-2 rounded">Invite</button>
              <button className="bg-blue-500 p-2 rounded">Message</button>
              <button className="bg-red-500 p-2 rounded">Connect</button>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <div className="text-sm">Rank</div>
              <div className="text-lg">COMMON SHILLER</div>
            </div>
            <div>
              <div className="text-sm">Games Played</div>
              <div className="text-lg">21</div>
            </div>
            <div>
              <div className="text-sm">Win Percentage</div>
              <div className="text-lg">57%</div>
            </div>
          </div>
        </div>

        {/* Game Stats Section */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Card 1 */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-lg">BULL OR BEAR</div>
            <div className="text-4xl font-bold">231</div>
            <div className="text-lg">Total Games Played</div>
            <div className="text-4xl font-bold">157</div>
            <div className="text-lg">WINS</div>
          </div>
          {/* Card 2 */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-lg">THE PRICE IS RIGHT</div>
            <div className="text-4xl font-bold">231</div>
            <div className="text-lg">Total Games Played</div>
            <div className="text-4xl font-bold">157</div>
            <div className="text-lg">WINS</div>
          </div>
          {/* Card 3 */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-lg">POOLS</div>
            <div className="text-4xl font-bold">231</div>
            <div className="text-lg">Total Games Played</div>
            <div className="text-4xl font-bold">157</div>
            <div className="text-lg">WINS</div>
          </div>
        </div>

        {/* Last Matches Section */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="text-lg mb-2">LAST MATCHES</div>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Opponent</th>
                <th>Game</th>
                <th>Stake</th>
                <th>Prediction</th>
                <th>Outcome</th>
                <th>Profit/Loss</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0x53...d887a</td>
                <td>BULL OR BEAR</td>
                <td>0.03 ETH</td>
                <td>PRICE MOONS</td>
                <td>PRICE MOONS</td>
                <td>0.03 ETH</td>
              </tr>
              <tr>
                <td>0x53...d887a</td>
                <td>BULL OR BEAR</td>
                <td>0.03 ETH</td>
                <td>PRICE MOONS</td>
                <td>PRICE RUGS</td>
                <td>0.03 ETH</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
