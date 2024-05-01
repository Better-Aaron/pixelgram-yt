"use client";

import { FollowerWithExtras } from "@/lib/definitions";

interface FollowersModalProps {
  followers: FollowerWithExtras[] | undefined;
  username?: string | null;
}

export const FollowersModal = ({}: FollowersModalProps) => {
  return <div>followers-modal</div>;
};
