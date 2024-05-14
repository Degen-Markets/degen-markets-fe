import { Heading, Headline, SubHeadline } from "@/app/components/Heading";
import EthPrice from "@/app/create-bet/_components/EthPrice";
import SlotMachine from "@/app/create-bet/_components/SlotMachine";
import ActionButton from "@/app/create-bet/_components/ActionButton";

const CreateBetPage = () => {
  return (
    <main className="text-center">
      <div className="flex justify-center select-none">
        <Heading className="mt-10 mb-12">
          <Headline>Challenge a friend</Headline>
          <SubHeadline>Test Build error</SubHeadline>
        </Heading>
      </div>
      <div className="flex justify-center select-none">
        <SlotMachine />
      </div>
      <EthPrice />
      <ActionButton />
    </main>
  );
};

export default CreateBetPage;
