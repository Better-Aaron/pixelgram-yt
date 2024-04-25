"use client";

import { CommentWithExtras } from "@/lib/definitions";
import { Comment } from "@prisma/client";
import { User } from "next-auth";
import Link from "next/link";
import { useOptimistic, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CreateCommentSchema } from "@/schemas/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { createComment } from "@/actions/comment";
interface CommnetsProps {
  postId: string;
  comments: CommentWithExtras[];
  user?: User | null;
}

export const Commnets = ({ postId, comments, user }: CommnetsProps) => {
  let [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateCommentSchema>>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      body: "",
      postId,
    },
  });

  const body = form.watch("body");

  const [optimisticComments, addOptimisticComment] = useOptimistic<
    CommentWithExtras[]
  >(
    comments,
    // @ts-ignore
    (state: Comment[], newComment: string) => [
      { body: newComment, userId: user?.id, postId, user },
      ...state,
    ],
  );

  const commentsCount = optimisticComments.length;

  const onSubmit = async (values: z.infer<typeof CreateCommentSchema>) => {
    const valuesCopy = { ...values };
    form.reset();
    startTransition(() => {
      addOptimisticComment(valuesCopy.body);
    });

    await createComment(valuesCopy);
  };

  return (
    <div className="space-y-0.5 px-3 sm:px-0">
      {commentsCount > 1 && (
        <Link
          scroll={false}
          href={`/dashboard/p/${postId}`}
          className="text-sm font-medium text-neutral-500"
        >
          View all comments
        </Link>
      )}
      {optimisticComments.slice(0, 3).map((comment, i) => {
        const username = comment.user?.name;
        return (
          <div key={i} className="text-sm items-center space-x-2 font-medium">
            <Link href={`/dashboard/${username}`} className="font-semibold">
              {username}
            </Link>
            <p>{comment.body}</p>
          </div>
        );
      })}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border-b border-gray-300 dark:border-neutral-800 pb-3 py-1 flex items-center space-x-2"
        >
          <FormField
            control={form.control}
            name="body"
            render={({ field, fieldState }) => (
              <FormItem className="w-full flex">
                <FormControl>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="bg-transparent text-sm border-none focus:outline-none flex-1 placeholder-neutral-500 dark:text-white dark:placeholder-neutral-400 font-medium"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {body.trim().length > 0 && (
            <button
              type="submit"
              className="text-sky-500 text-sm font-semibold hover:text-white disabled:hover:text-sky-500 disabled:cursor-not-allowed"
            >
              Post
            </button>
          )}
        </form>
      </Form>
    </div>
  );
};
