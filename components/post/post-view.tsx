"use client";

import useMount from "@/hooks/use-mount";
import { PostWithExtras } from "@/lib/definitions";
import { Post } from "@prisma/client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { UserAvatar } from "../auth/user-avatar";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { MiniPost } from "./mini-post";
import { Commnets } from "../commnets";
import { Comment } from "./comment";
import { ViewPost } from "./view-post";
import { PostActions } from "./post-actions";
import Image from "next/image";
import { CommentForm } from "./comment-form";

interface PostViewProps {
  id: string;
  post: PostWithExtras;
}

export const PostView = ({ id, post }: PostViewProps) => {
  const pathname = usePathname();
  const isPostModal = pathname === `/dashboard/p/${id}`;
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const inputRef = useRef<HTMLInputElement>(null);
  const username = post.user.name;
  const href = `/dashboard/${username}`;
  const mount = useMount();

  if (!mount) return null;

  return (
    <Dialog open={isPostModal} onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="flex gap-0 flex-col md:flex-row items-start p-0 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl h-full max-h-[500px] lg:max-h-[700px] xl:max-h-[800px]">
        <div className="flex flex-col justify-between md:h-full md:order-2 w-full max-w-md">
          <DialogHeader className="flex border-b space-y-0 space-x-2.5 flex-row items-center py-4 pl-3.5 pr-6">
            <Link href={href}>
              <UserAvatar user={post.user} />
            </Link>
            <Link href={href} className="font-semibold text-sm">
              {username}
            </Link>
          </DialogHeader>

          <ScrollArea className="hidden md:inline border-b flex-1 py-1.5">
            <MiniPost post={post} />
            {post.comments.length > 0 && (
              <>
                {post.comments.map((comment) => {
                  return (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      inputRef={inputRef}
                    />
                  );
                })}
              </>
            )}
          </ScrollArea>

          <ViewPost className="hidden md:flex border-b" />

          <div className="px-2 hidden md:block mt-auto border-b p-2.5">
            <PostActions post={post} userId={user?.id} />
            <time className="text-[11px]  uppercase text-zinc-500 font-medium">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <CommentForm
            postId={id}
            className="hidden md:inline-flex"
            inputRef={inputRef}
          />
        </div>

        <div className="relative overflow-hidden h-96 md:h-[500px] lg:h-[700px] xl:h-[800px] max-w-3xl w-full">
          <Image
            src={post.fileUrl}
            fill
            objectFit="cover"
            alt="Post Image"
            className="md:rounded-l-md object-cover"
          />
        </div>

        <PostActions
          post={post}
          userId={user?.id}
          className="md:hidden border-b p-2.5"
        />
        <CommentForm postId={id} className="md:hidden" inputRef={inputRef} />
        <ViewPost className="md:hidden" />
      </DialogContent>
    </Dialog>
  );
};
