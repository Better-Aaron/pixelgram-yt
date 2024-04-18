import * as z from "zod";

//* Auth - 로그인
export const LoginSchema = z.object({
  email: z.string().email({
    message: "이메일은 필수입니다.",
  }),
  password: z.string().min(6, {
    message: "6자리 이상의 비밀번호를 입력해주세요.",
  }),
});

//* Auth - 회원가입
export const RegisterSchema = z.object({
  email: z.string().email({
    message: "이메일은 필수입니다.",
  }),
  password: z.string().min(6, {
    message: "6자리 이상의 비밀번호를 입력해주세요.",
  }),
  name: z.string().min(1, {
    message: "이름은 필수 입니다.",
  }),
});

//* Auth - 비밀번호 리셋
export const ResetSchema = z.object({
  email: z.string().email({
    message: "이메일은 필수입니다.",
  }),
});

//* Auth - 비밀번호 변경 스키마
export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "6자리 이상의 비밀번호를 입력해주세요.",
    }),
    confirmPassword: z.string().min(6, {
      message: "6자리 이상의 비밀번호를 입력해주세요.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
