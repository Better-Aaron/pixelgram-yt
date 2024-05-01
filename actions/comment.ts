"use server";

import { getUserId } from "@/hooks/get-userId";
import { CreateCommentSchema, DeleteCommentSchema } from "@/schemas";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//* Commnet 등록
export const createComment = async (
  values: z.infer<typeof CreateCommentSchema>,
) => {
  const userId = await getUserId();
  const validateFields = CreateCommentSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      messages: "Missing Fields. Failed to Create Comment.",
    };
  }

  const { postId, body } = validateFields.data;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  try {
    await prisma.comment.create({
      data: {
        body,
        postId,
        userId,
      },
    });
    revalidatePath("/dashboard");
    return { message: "Create Comment" };
  } catch (error) {
    return { message: "Database Error: Failed to create comment" };
  }
};

//* comment 삭제
export const deleteComment = async (formData: FormData) => {
  const userId = await getUserId();

  const { id } = DeleteCommentSchema.parse({
    id: formData.get("id"),
  });

  const comment = await prisma.comment.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  try {
    await prisma.comment.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard");
    return { message: "deleted comment." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Comment." };
  }
};
