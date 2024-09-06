import Wrapper from "@/app/components/Wrapper";
import BlinkLoader from "@/app/pools/[id]/BlinkLoader";

const PoolPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <Wrapper className="flex justify-center">
      <div className="w-full md:w-2/6 text-lg">
        <BlinkLoader poolId={id} />
      </div>
    </Wrapper>
  );
};
export default PoolPage;
