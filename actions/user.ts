"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FollowUserSchema, LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";
import { getUserId } from "@/hooks/get-userId";
import { revalidatePath } from "next/cache";

export const followUser = async (formData: FormData) => {
  const userId = await getUserId();

  const { id } = FollowUserSchema.parse({
    id: formData.get("id"),
  });

  const user = await prisma?.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const follows = await prisma?.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: userId,
        followingId: id,
      },
    },
  });

  if (follows) {
    try {
      await prisma?.follows.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: id,
          },
        },
      });
    } catch (error) {
      return {
        message: "Database Error : Failed to Unfollow User",
      };
    }
  }

  try {
    await prisma?.follows.create({
      data: {
        followerId: userId,
        followingId: id,
      },
    });

    revalidatePath("/dashboard");
    return { message: "Followed User." };
  } catch (error) {
    return {
      message: "Database Error : Failed to Follow User",
    };
  }
};
