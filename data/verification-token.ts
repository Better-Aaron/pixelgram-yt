import prisma from "@/lib/prisma";

//* 토큰으로 사용자 확인 토큰 조회
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

//* 이메일로 사용자 확인 토큰 조회
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};
