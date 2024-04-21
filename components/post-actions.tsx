"use client";

import { PostWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LikeButton } from "./like-button";

interface PostActionsProps {
  post: PostWithExtras;
  userId?: string;
  className?: string;
}

export const PostActions = ({ post, userId, className }: PostActionsProps) => {
  return (
    <div className={cn("relative flex items-start w-full gap-x-2", className)}>
      <LikeButton post={post} userId={userId} />
      <Link href={`/dashboard/p/${post.id}`}>
        <div>ActionICon</div>
      </Link>
      <div>ShareButton</div>
      <div>BookmarkButton</div>
    </div>
  );
};
