import prisma from '@/lib/prisma';

//* 사용자 아이디로 조회
export const getAccountByUserId = async (id: string) => {
  try {
    const account = prisma.account.findUnique({
      where: {
        id,
      },
    });

    return account;
  } catch {
    return null;
  }
};
