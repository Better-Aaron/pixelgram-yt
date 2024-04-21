"use server";

import { getUserId } from "@/hooks/get-userId";
import {
  CreatePostSchema,
  DeletePostSchema,
  UpdatePostSchema,
} from "@/schemas";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//* 포스트 등록
export const createPost = async (values: z.infer<typeof CreatePostSchema>) => {
  const userId = await getUserId();
  const validateFields = CreatePostSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create Post",
    };
  }

  const { fileUrl, caption } = validateFields.data;

  try {
    await prisma.post.create({
      data: {
        caption,
        fileUrl,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Field to Create Post.",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
};

//* 포스트 삭제
export const deletePost = async (formData: FormData) => {
  const userId = await getUserId();

  const { id } = DeletePostSchema.parse({
    id: formData.get("id"),
  });

  const post = await prisma.post.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard");
    return { message: "Deleted Post." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Post." };
  }
};

//* 포스트 수정
export const updatePost = async (values: z.infer<typeof UpdatePostSchema>) => {
  const userId = await getUserId();
  const validatedFields = UpdatePostSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields, Failed to Update Post.",
    };
  }

  const { id, fileUrl, caption } = validatedFields.data;

  const post = await prisma.post.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  try {
    await prisma.post.update({
      where: {
        id,
      },
      data: {
        fileUrl,
        caption,
      },
    });
  } catch (error) {
    return { message: "Database Error: Failed to Update Post." };
  }
};
