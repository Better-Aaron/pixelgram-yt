import * as z from "zod";

//* Auth - 로그인
export const LoginSchema = z.object({
  email: z.string().email({
    message: "이메일은 필수입니다.",
  }),
  password: z.string().min(6, {
    message: "6자리 이상의 비밀번호를 입력해주세요.",
  }),
});

//* Auth - 회원가입
export const RegisterSchema = z.object({
  email: z.string().email({
    message: "이메일은 필수입니다.",
  }),
  password: z.string().min(6, {
    message: "6자리 이상의 비밀번호를 입력해주세요.",
  }),
  name: z.string().min(1, {
    message: "이름은 필수 입니다.",
  }),
});

//* Auth - 비밀번호 리셋
export const ResetSchema = z.object({
  email: z.string().email({
    message: "이메일은 필수입니다.",
  }),
});

//* Auth - 비밀번호 변경 스키마
export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "6자리 이상의 비밀번호를 입력해주세요.",
    }),
    confirmPassword: z.string().min(6, {
      message: "6자리 이상의 비밀번호를 입력해주세요.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

//* Post - post 스키마
export const PostSchema = z.object({
  id: z.string(),
  fileUrl: z.string().url(),
  caption: z.string().optional(),
});

export const CreatePostSchema = PostSchema.omit({ id: true });
export const UpdatePostSchema = PostSchema;
export const DeletePostSchema = PostSchema.pick({ id: true });

//* Comment - comment 스키마
export const CommentSchema = z.object({
  id: z.string(),
  body: z.string(),
  postId: z.string(),
});

export const CreateCommentSchema = CommentSchema.omit({ id: true });
export const UpdateCommentSchema = CommentSchema;
export const DeleteCommentSchema = CommentSchema.pick({ id: true });

//* User -  User 스키마
export const UserSchema = z.object({
  id: z.string(),
  username: z.string().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  bio: z.string().max(150).optional(),
  website: z.string().optional(),
  gender: z.string().optional(),
});

export const UpdateUserSchema = UserSchema;
export const DeleteUserSchema = UserSchema.pick({ id: true });
export const FollowUserSchema = UserSchema.pick({ id: true });

export const BookmarkSchema = z.object({
  postId: z.string(),
});
export const LikeSchema = z.object({
  postId: z.string(),
});
