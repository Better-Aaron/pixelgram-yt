"use client";

import useMount from "@/hooks/use-mount";
import { PostWithExtras } from "@/lib/definitions";
import { Post } from "@prisma/client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { UserAvatar } from "../auth/user-avatar";

interface PostViewProps {
  id: string;
  post: PostWithExtras;
}

export const PostView = ({ id, post }: PostViewProps) => {
  const pathname = usePathname();
  const isPostModal = pathname === `/dashbaord/p/${id}`;
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
      <DialogContent className="">
        <div className="">
          <DialogHeader className="">
            <UserAvatar user={post.user} />
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
};
