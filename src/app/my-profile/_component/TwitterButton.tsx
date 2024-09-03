"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getTwitterLoginLink,
  saveTwitterUser,
} from "@/app/lib/utils/api/twitter";
import { Button } from "@/app/components/Button";
import React, { useEffect, useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";

const defaultText = "Connect X";

const TwitterButton = () => {
  const [text, setText] = useState(defaultText);
  const twitterUserFound = text !== defaultText;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLogin = async () => {
    const linkResponse = await getTwitterLoginLink();
    router.push(linkResponse.data.url);
  };

  const saveUser = async () => {
    const twitterCode = searchParams.get("code");
    if (twitterCode) {
      setText("Loading");
      const twitterUserResponse = await saveTwitterUser(twitterCode);
      const twitterUser = twitterUserResponse.data;
      setText(`@${twitterUser.username}`);
      router.replace(pathname);
    }
  };

  useEffect(() => {
    saveUser();
  }, []);

  return (
    <>
      <Button size={"small"} onClick={handleLogin} disabled={twitterUserFound}>
        {text}
      </Button>
      {twitterUserFound && (
        <BsPatchCheckFill className="absolute -top-3 -right-3" size={25} />
      )}
    </>
  );
};

export default TwitterButton;
