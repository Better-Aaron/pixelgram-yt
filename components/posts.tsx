import { fetchPosts } from "@/data/data";
import { Post } from "./post";

export const Posts = async () => {
  const posts = await fetchPosts();
  console.log(posts);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};
