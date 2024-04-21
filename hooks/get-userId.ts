import { auth } from "@/auth";

export const getUserId = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("You must be signed in to use this feature.");
  }

  return userId;
};
