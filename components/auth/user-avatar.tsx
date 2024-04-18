import { AvatarProps } from "@radix-ui/react-avatar";
import { type User } from "next-auth";
import { Avatar } from "../ui/avatar";
import Image from "next/image";

interface UserAvatarProps extends Partial<AvatarProps> {
  user: User | undefined;
}

export const UserAvatar = ({ user, ...avatarProps }: UserAvatarProps) => {
  return (
    <Avatar className="relative size-8 " {...avatarProps}>
      <Image
        src={
          user?.image ||
          "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        fill
        alt={`${user?.name}'s profile picture`}
        className="rounded-full object-cover"
      />
    </Avatar>
  );
};
