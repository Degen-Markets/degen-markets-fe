import React from "react";
import Image from "next/image";
import { SiSolana } from "react-icons/si";

interface ActivityRowProps {
  marketName: string;
  value: string;
  payout: string;
  imageUrl: string;
}

const ActivityRow: React.FC<ActivityRowProps> = ({
  marketName,
  value,
  payout,
  imageUrl,
}) => (
  <tr className="border-t border-gray-800 font-semibold">
    <td className="py-4">
      <div className="flex items-center space-x-2">
        <Image
          src={imageUrl}
          alt="Market"
          width={50}
          height={50}
          className="rounded"
        />
        <div>
          <p className="mb-1">{marketName}</p>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span className="bg-black-light md:text-left text-center rounded-lg border font-bold px-2 py-0.5">
              Based Trump
            </span>
            <div className="flex items-center space-x-1">
              <span>1.6</span>
              <SiSolana
                size={12}
                className="rounded-full bg-white p-0.5 text-black-dark"
              />
            </div>
          </div>
        </div>
      </div>
    </td>
    <td className="py-4 text-center">{value}</td>
    <td className="py-4 text-center text-green-main">{payout}</td>
  </tr>
);

export default ActivityRow;
