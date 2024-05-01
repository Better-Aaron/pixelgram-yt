import { PostsGrid } from "@/components/post/posts-grid";
import { fetchPostsByUserId } from "@/data/data";

const ProfilePage = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const posts = await fetchPostsByUserId(userId);

  return <PostsGrid posts={posts} />;
};

export default ProfilePage;
