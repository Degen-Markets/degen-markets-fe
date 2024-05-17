import { Heading, Headline } from "@/app/components/Heading";
import EthPrice from "@/app/create-bet/_components/EthPrice";
import SlotMachine from "@/app/create-bet/_components/SlotMachine";
import ActionButton from "@/app/create-bet/_components/ActionButton";
import { Suspense } from "react";
import Image from "next/image";

const CreateBetPage = () => {
  return (
    <main className="text-center relative w-full">
      <div className="absolute -top-20 right-0 -z-[1]">
        <Image src={"../Bull.svg"} width={243} height={377} alt="Bull" />
      </div>
      <div className="absolute bottom-0 left-0 -z-[1]">
        <Image src={'../Bear.svg'} width={217} height={486} alt="Bear" />
      </div>

      <div className="w-[80%] md:w-1/2 mx-auto">
        <Heading className="mt-10 mb-16 md:mb-20">
          <Headline>Challenge a fren</Headline>
        </Heading>
        <div className="flex justify-center select-none">
          <Suspense fallback={<></>}>
            <SlotMachine />
          </Suspense>
        </div>
        <EthPrice />
        <ActionButton />
      </div>
    </main>
  );
};

export default CreateBetPage;
