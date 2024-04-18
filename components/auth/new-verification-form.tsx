"use client";

import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import useMount from "@/hooks/use-mount";

export const NewVerificationForm = () => {
  const mount = useMount();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (token) {
      newVerification(token).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  if (!mount) return null;

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="로그인으로 돌아가기"
      backButtonHref="/auth/login"
    >
      {error ? (
        <FormError message={error} />
      ) : success ? (
        <FormSuccess message={success} />
      ) : (
        <div className="flex w-full items-center justify-center">
          <BeatLoader />
        </div>
      )}
    </CardWrapper>
  );
};
