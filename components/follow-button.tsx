"use client";

import { cn } from "@/lib/utils";
import { SubmitButton } from "./submit-button";
import { buttonVariants } from "./ui/button";
import { followUser } from "@/actions/user";

interface FollowButtonProps {
  profileId: string;
  isFollowing?: boolean;
  className?: string;
  buttonClassName?: string;
}

export const FollowButton = ({
  isFollowing,
  profileId,
  className,
  buttonClassName,
}: FollowButtonProps) => {
  return (
    <form action={followUser} className={className}>
      <input type="hidden" value={profileId} name="id" />
      <SubmitButton
        className={buttonVariants({
          variant: isFollowing ? "secondary" : "default",
          className: cn("!font-bold w-full", buttonClassName),
          size: "sm",
        })}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </SubmitButton>
    </form>
  );
};
