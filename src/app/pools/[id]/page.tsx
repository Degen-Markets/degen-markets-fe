import Wrapper from "@/app/components/Wrapper";
import BlinkLoader from "@/app/pools/[id]/BlinkLoader";

const PoolPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <BlinkLoader poolId={id} />
    </Wrapper>
  );
};
export default PoolPage;
