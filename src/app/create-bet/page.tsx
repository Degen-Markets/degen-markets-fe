import EthPrice from "@/app/create-bet/_components/EthPrice";
import ActionButton from "@/app/create-bet/_components/ActionButton";
import BetComponent from "./_components/BetComponent";
import BetLayout from "@/app/layouts/BetLayout";

const CreateBetPage = () => {
  return (
    <BetLayout>
      <h2 className="pixel-art-border-sm-dark lg:pixel-art-border-lg-dark bg-prussian-dark text-4xl lg:text-8xl w-fit px-8">
        Challenge a fren
      </h2>
      <BetComponent />
      <EthPrice />
      <ActionButton />
    </BetLayout>
  );
};

export default CreateBetPage;
