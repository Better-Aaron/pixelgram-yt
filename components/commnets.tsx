"use client";

import { CommentWithExtras } from "@/lib/definitions";
import { Comment } from "@prisma/client";
import { User } from "next-auth";
import Link from "next/link";
import { useTransition } from "react";

interface CommnetsProps {
  postId: string;
  comments: CommentWithExtras[];
  user?: User | null;
}

export const Commnets = ({ postId, comments, user }: CommnetsProps) => {
  let [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-0.5 px-3 sm:px-0">
      <Link
        scroll={false}
        href={`/dashboard/p/${postId}`}
        className="text-sm font-medium text-neutral-500"
      >
        View all comments
      </Link>
    </div>
  );
};
