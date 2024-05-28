import EthPrice from "@/app/create-bet/_components/EthPrice";
import ActionButton from "@/app/create-bet/_components/ActionButton";
import Image from "next/image";
import BetComponent from "./_components/BetComponent";

const CreateBetPage = () => {
  return (
    <main className="text-center w-full">
      <div className="absolute top-20 right-0 -z-[1] hidden sm:block">
        <Image src={"../Bull.svg"} width={243} height={377} alt="Bull" />
      </div>
      <div className="absolute bottom-0 left-0 -z-[1] hidden sm:block">
        <Image src={"../Bear.svg"} width={217} height={486} alt="Bear" />
      </div>

      <div className="w-[80%] md:w-1/2 mx-auto">
        <h2 className="pixel-art-border-lg-dark bg-blue-dark text-3xl sm:text-5xl w-fit px-8">
          Challenge a fren
        </h2>
        <BetComponent />
        <EthPrice />
        <ActionButton />
      </div>
    </main>
  );
};

export default CreateBetPage;
