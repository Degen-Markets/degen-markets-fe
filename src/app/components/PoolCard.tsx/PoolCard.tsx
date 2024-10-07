import Image from "next/image";
import { Button } from "@/app/components/Button/Button";

const PoolCard = () => {
  return (
    <div className="p-8 bg-steel-gray rounded-lg space-y-4">
      <Image
        src="https://degen-markets-static.s3.eu-west-1.amazonaws.com/trump_vs_elon.png"
        alt="Trump Vs Elon"
        width={640}
        height={480}
        className="rounded-lg"
      />
      <div className="space-y-2">
        <h3 className="font-semibold text-base">
          Who will be the first to mention "crypto" on tonight's interview?
        </h3>
        <p className="text-lavender-blue text-sm">
          Degods reaches or crosses $1B market cap on MagicEden or Tensor by end
          of year 2024. Option labeled "Degods" stands for yes, whereas "Frank
          not based" stands for no.
        </p>
      </div>
      <div className="flex gap-4 justify-end">
        <Button size="small" intent="primary">
          Bet Now
        </Button>
        <Button size="small" intent="outline">
          Share
        </Button>
      </div>
    </div>
  );
};

export default PoolCard;
