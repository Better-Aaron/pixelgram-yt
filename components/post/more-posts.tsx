import { fetchPostById, fetchPostsByUserId } from "@/data/data";
import Link from "next/link";
import React from "react";
import { PostsGrid } from "./posts-grid";

const MorePosts = async ({ postId }: { postId: string }) => {
  const post = await fetchPostById(postId);
  const postUsername = post?.user.name;
  const posts = await fetchPostsByUserId(post?.user.id!, postId);

  return (
    <div>
      <p>
        More Posts from{" "}
        <Link
          href={`/dashboard/${post?.user.id}`}
          className="dark:text-white text-black hover:opacity-50"
        >
          {postUsername}
        </Link>
      </p>
      <PostsGrid posts={posts} />
    </div>
  );
};

export default MorePosts;
