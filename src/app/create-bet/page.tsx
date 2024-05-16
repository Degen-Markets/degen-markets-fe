import { Heading, Headline } from "@/app/components/Heading";
import EthPrice from "@/app/create-bet/_components/EthPrice";
import SlotMachine from "@/app/create-bet/_components/SlotMachine";
import ActionButton from "@/app/create-bet/_components/ActionButton";
import { Suspense } from "react";

const CreateBetPage = () => {
  return (
    <Suspense fallback={<></>}>
      <main className="text-center">
        <div className="w-[80%] md:w-1/2 mx-auto">
          <Heading className="mt-10 mb-16 md:mb-20">
            <Headline>Challenge a fren</Headline>
          </Heading>
          <div className="flex justify-center select-none">
            <SlotMachine />
          </div>
          <EthPrice />
          <ActionButton />
        </div>
      </main>
    </Suspense>
  );
};

export default CreateBetPage;
