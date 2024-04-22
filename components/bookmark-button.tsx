"use client";

import { Post, SavedPost } from "@prisma/client";
import { ActionIcon } from "./action-icon";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOptimistic } from "react";
import { PostWithExtras } from "@/lib/definitions";
import { bookmarkPost } from "@/actions/post";

interface BookmarkButtonProps {
  post: PostWithExtras;
  userId?: string;
}

export const BookmarkButton = ({ post, userId }: BookmarkButtonProps) => {
  const predicate = (bookmark: SavedPost) =>
    bookmark.userId === userId && bookmark.postId === post.id;

  const [optimisticBookmarks, addOptimisticBookmark] = useOptimistic<
    SavedPost[]
  >(
    post.savedBy,
    // @ts-ignore
    (state: SavedPost[], newBookmark: SavedPost) =>
      state.find(predicate)
        ? //   here we check if the bookmark already exists, if it does, we remove it, if it doesn't, we add it
          state.filter((bookmark) => bookmark.userId !== userId)
        : [...state, newBookmark],
  );

  const onSubmit = async (formData: FormData) => {
    const postId = formData.get("postId");
    addOptimisticBookmark({ postId, userId });
    await bookmarkPost(postId);
  };
  return (
    <form action={onSubmit} className="ml-auto">
      <input type="hidden" name="postId" value={post.id} />
      <ActionIcon>
        <Bookmark
          className={cn("size-6", {
            "dar:fill-white fill-black": optimisticBookmarks.some(predicate),
          })}
        />
      </ActionIcon>
    </form>
  );
};
