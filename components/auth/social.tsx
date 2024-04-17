"use client";

import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const onClick = (provider: "google" | "kakao" | "naver" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="size-5" />
      </Button>
      <Button
        className="w-full text-green-500"
        variant="outline"
        onClick={() => onClick("naver")}
      >
        <SiNaver className="size-5" />
      </Button>
      <Button
        className="w-full text-yellow-300"
        variant="outline"
        onClick={() => onClick("kakao")}
      >
        <RiKakaoTalkFill className="size-7" />
      </Button>
      <Button
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="size-5" />
      </Button>
    </div>
  );
};
