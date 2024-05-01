import { PostsGrid } from "@/components/post/posts-grid";
import { fetchSavedPostByUserId } from "@/data/data";

const SavedPage = async ({ params: { id } }: { params: { id: string } }) => {
  const savedPosts = await fetchSavedPostByUserId(id);
  const posts = savedPosts?.map((savedPost) => savedPost.post);
  return <PostsGrid posts={posts} />;
};

export default SavedPage;
