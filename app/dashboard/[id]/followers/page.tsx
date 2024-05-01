import { FollowersModal } from "@/components/profile/followers-modal";
import { fetchProfile } from "@/data/data";
import React from "react";

const FollowersPage = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const profile = await fetchProfile(userId);
  const followers = profile?.followedBy;

  return <FollowersModal followers={followers} username={profile?.name} />;
};

export default FollowersPage;
