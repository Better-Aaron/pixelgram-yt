import prisma from "@/lib/prisma";

//* 사용자 이메일로 조회
export const getUserByEmail = async (email: string) => {
  try {
    const user = prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch {
    return null;
  }
};

//* 사용자 아이디로 조회
export const getUserById = async (id: string |undefined) => {
  try {
    const user = prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch {
    return null;
  }
};
