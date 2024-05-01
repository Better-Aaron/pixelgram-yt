"use client";

import { CommentWithExtras } from "@/lib/definitions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserAvatar } from "../auth/user-avatar";
import { TimeStamp } from "../time-stamp";
import { CommentOptions } from "./comment-options";

interface CommentProps {
  comment: CommentWithExtras;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const Comment = ({ comment, inputRef }: CommentProps) => {
  const { data: session } = useSession();
  const username = comment.user.name;
  const href = `/dashboard/${comment.user.id}`;

  return (
    <div className="group p-3 px-3.5 flex items-start space-x-2.5">
      <Link href={href}>
        <UserAvatar user={comment.user} />
      </Link>
      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 leading-none text-sm">
          <Link href={href} className="semibold">
            {username}
          </Link>
          <p className="font-medium">{comment.body}</p>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          <TimeStamp createdAt={comment.createdAt} />
          <button
            className="text-xs font-semibold text-neutral-500"
            onClick={() => inputRef?.current?.focus()}
          >
            Relpy
          </button>
          {comment.userId === session?.user.id && (
            <CommentOptions comment={comment} />
          )}
        </div>
      </div>
    </div>
  );
};
