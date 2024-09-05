import Wrapper from "@/app/components/Wrapper";
import BlinkCard from "@/app/pools/[id]/BlinkCard";

const PoolPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <BlinkCard poolId={id} />
    </Wrapper>
  );
};
export default PoolPage;
