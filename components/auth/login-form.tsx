"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { CardWrapper } from "./card-wrapper";
export const LoginForm = () => {
  const { pending } = useFormStatus();
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="계정생성"
      backButtonHref="'/register"
      showSocial
    >
      <Button
        className="mt-4 w-full"
        variant={"secondary"}
        aria-disabled={pending}
        onClick={() => {
          signIn("google", { callbackUrl: "/dashboard" });
        }}
      >
        Log in with Google
      </Button>
    </CardWrapper>
  );
};
