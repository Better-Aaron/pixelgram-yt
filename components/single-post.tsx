import { auth } from "@/auth";
import { fetchPostById } from "@/data/data";
import { notFound } from "next/navigation";
import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";

const SinglePost = async ({ id }: { id: string }) => {
  const post = await fetchPostById(id);
  const session = await auth();
  const postUseranme = post?.user.name;
  const userId = session?.user.id;

  if (!post) {
    notFound();
  }

  return (
    <>
      <Card>
        <div className="relative oferflow">
          <Image
            src={post.fileUrl}
            alt="Post preview"
            fill
            className="md:rounded-l-md object-cover"
          />
        </div>
      </Card>
    </>
  );
};

export default SinglePost;
