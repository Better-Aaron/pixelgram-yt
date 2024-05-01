import { EditPost } from "@/components/post/edit-post";
import { fetchPostById } from "@/data/data";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const EditPostPage = async ({ params: { id } }: Props) => {
  const post = await fetchPostById(id);
  if (!post) {
    notFound();
  }

  return <EditPost id={id} post={post} />;
};

export default EditPostPage;
