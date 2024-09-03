"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getTwitterLoginLink,
  saveTwitterUser,
} from "@/app/lib/utils/api/twitter";
import { Button } from "@/app/components/Button";
import { useEffect, useState } from "react";

const TwitterButton = () => {
  const [connected, setConnected] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async () => {
    const linkResponse = await getTwitterLoginLink();
    router.push(linkResponse.data.url);
  };

  const saveUser = async () => {
    const twitterCode = searchParams.get("code");
    if (twitterCode) {
      setConnected(true);
      const twitterUser = await saveTwitterUser(twitterCode);
      console.log(twitterUser);
    }
  };

  useEffect(() => {
    saveUser();
  }, []);

  return (
    <Button size={"small"} onClick={handleLogin}>
      {connected ? "Loading" : "Connect X"}
    </Button>
  );
};

export default TwitterButton;
