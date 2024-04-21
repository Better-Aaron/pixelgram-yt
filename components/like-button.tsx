"use client";

import { PostWithExtras } from "@/lib/definitions";

interface LikeButtonProps {
  post: PostWithExtras;
  userId?: string;
}

export const LikeButton = ({ post, userId }: LikeButtonProps) => {
  return <div className="flex flex-col">like-button</div>;
};
