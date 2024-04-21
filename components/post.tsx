import { auth } from "@/auth";
import { PostWithExtras } from "@/lib/definitions";
import React from "react";
import { UserAvatar } from "./auth/user-avatar";
import { TimeStamp } from "./time-stamp";
import { Card } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Post = async ({ post }: { post: PostWithExtras }) => {
  const session = await auth();
  const userId = session?.user?.id;
  const username = post.user.name;

  if (!session?.user) return null;

  return (
    <div>
      <div className="">
        <div className="">
          <UserAvatar user={post.user} />
          <div className="">
            <p>
              <span>{username}</span>
              <span>•</span>
              <TimeStamp createdAt={post.createdAt} />
            </p>
            <p>Daegu, Republic of Korea</p>
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

      {/* postActions */}

      {post.caption && (
        <div className="text-sm leading-none flex items-center space-x-2 font-medium px-3 sm:px-0">
          <Link href={`/dashboard/${userId}`}>{username}</Link>
          <p>{post.caption}</p>
        </div>
      )}
    </div>
  );
};
