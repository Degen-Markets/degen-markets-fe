"use client";
import { useRouter } from "next/navigation";
import { getTwitterLoginLink } from "@/app/lib/utils/api/getTwitterLoginLink";
import { Button } from "@/app/components/Button";

const TwitterButton = () => {
  const router = useRouter();
  const handleLogin = async () => {
    const linkResponse = await getTwitterLoginLink();
    router.push(linkResponse.data.url);
  };
  return (
    <Button size={"small"} onClick={handleLogin}>
      Connect X
    </Button>
  );
};

export default TwitterButton;
