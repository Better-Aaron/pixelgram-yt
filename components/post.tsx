import { auth } from "@/auth";
import { PostWithExtras } from "@/lib/definitions";
import React from "react";
import { UserAvatar } from "./auth/user-avatar";
import { TimeStamp } from "./time-stamp";
import { Card } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PostActions } from "./post-actions";

export const Post = async ({ post }: { post: PostWithExtras }) => {
  const session = await auth();
  const userId = session?.user?.id;
  const username = post.user.name;

  if (!session?.user) return null;

  return (
    <div className="flex flex-col spacey-y-2.5">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <div className="flex space-x-3 items-center">
          <UserAvatar user={post.user} />
          <div className="text-sm">
            <p className="space-x-1">
              <span className="font-semibold">{username}</span>
              <span className="font-medium text-neutral-500 dark:text-neutral-400 text-xs">
                •
              </span>
              <TimeStamp createdAt={post.createdAt} />
            </p>
            <p className="text-sx text-block dark:text-white font-medium">
              Daegu, Republic of Korea
            </p>
          </div>
        </div>
        {/* postOptions */}
      </div>
      <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md">
        <Image
          src={post.fileUrl}
          alt={post.caption || "Post Image"}
          fill
          className="sm:rounded-md object-cover"
        />
      </Card>

      <PostActions post={post} userId={userId} />

      {post.caption && (
        <div className="text-sm leading-none flex items-center space-x-2 font-medium px-3 sm:px-0">
          <Link href={`/dashboard/${userId}`}>{username}</Link>
          <p>{post.caption}</p>
        </div>
      )}
    </div>
  );
};
