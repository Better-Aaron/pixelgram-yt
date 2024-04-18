"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "유효하지 않은 이메일, 비밀번호 입니다." };
  }

  const { email, password } = validateFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "등록되지 않은 이메일입니다." };
  }

  const passwordsMatch = await bcrypt.compareSync(
    password,
    existingUser.password,
  );

  if (!passwordsMatch) {
    return { error: "유효하지 않은 이메일, 비밀번호 입니다." };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "사용자 검증 메일을 보냈습니다." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "이메일 or 비밀번호가 일치 하지 않습니다." };
        default:
          return { error: "내부 서버 오류가 발생했습니다." };
      }
    }
    throw error;
  }
};
