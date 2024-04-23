"use client";

import { Link, Send } from "lucide-react";
import { ActionIcon } from "./action-icon";
import { toast } from "sonner";

interface ShareButtonProps {
  postId: string;
}

export const ShareButton = ({ postId }: ShareButtonProps) => {
  return (
    <ActionIcon
      onClick={() => {
        navigator.clipboard.writeText(
          `${window.location.origin}/dashboard/p/${postId}`,
        );
        toast("Link copied to clipboard", {
          icon: <Link className="size-5" />,
        });
      }}
    >
      <Send className="size-6" />
    </ActionIcon>
  );
};
