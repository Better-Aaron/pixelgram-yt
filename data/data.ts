import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

export const fetchPosts = async () => {
  noStore();

  try {
    const data = await prisma.post.findMany({
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        savedBy: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error", error);
    throw new Error("Failed to fetch posts");
  }
};

export const fetchPostById = async (id: string) => {
  noStore();
  try {
    const data = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        savedBy: true,
        user: true,
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post");
  }
};

export const fetchPostsByUserId = async (userId: string, postId?: string) => {
  noStore();

  try {
    const data = await prisma.post.findMany({
      where: {
        user: {
          id: userId,
        },
        NOT: {
          id: postId,
        },
      },
      include: {
        comments: {
          include: {
            user: true,
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        savedBy: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts");
  }
};

//* 사용자 profile
export const fetchProfile = async (userId: string) => {
  noStore();

  try {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        posts: {
          orderBy: {
            createdAt: "desc",
          },
        },
        saved: {
          orderBy: {
            createdAt: "desc",
          },
        },
        followedBy: {
          include: {
            follower: {
              include: {
                following: true,
                followedBy: true,
              },
            },
          },
        },
        following: {
          include: {
            following: {
              include: {
                following: true,
                followedBy: true,
              },
            },
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch profile");
  }
};

export const fetchSavedPostByUserId = async (userId: string) => {
  noStore();

  try {
    const data = await prisma.savedPost.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      include: {
        post: {
          include: {
            comments: {
              include: {
                user: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
            likes: {
              include: {
                user: true,
              },
            },
            savedBy: true,
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error", error);
    throw new Error("Failed to fetch saved posts");
  }
};
