import { PostView } from "@/components/post/post-view";
import { fetchPostById } from "@/data/data";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export const PostModal = async ({ params: { id } }: PageProps) => {
  const post = await fetchPostById(id);

  if (!post) {
    notFound();
  }

  return <PostView id={id} post={post} />;
};

export default PostModal;
