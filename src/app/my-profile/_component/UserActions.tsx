import React from "react";
import Image from "next/image";

const UserActions: React.FC = () => {
  return (
    <div className="flex md:flex-col justify-between w-full max-w-md md:w-auto h-full lg:space-y-5">
      <button className="flex justify-center flex-col items-center text-lg font-bold">
        <Image src="/profile/AddUser.svg" alt="alt" width={50} height={50} />
        <p>Invite</p>
      </button>
      <button className="flex justify-center flex-col items-center text-lg font-bold">
        <Image src="/profile/Mail.svg" alt="alt" width={50} height={50} />
        <p>Message</p>
      </button>
      <button className="flex justify-center flex-col items-center text-lg font-bold">
        <Image src="/profile/TwitterX.svg" alt="alt" width={50} height={50} />
        <p>Connect</p>
      </button>
    </div>
  );
};

export default UserActions;
