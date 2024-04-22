"use client";

import { Send } from "lucide-react";
import { ActionIcon } from "./action-icon";

interface ShareButtonProps {
  postId: string;
}

export const ShareButton = ({ postId }: ShareButtonProps) => {
  return (
    <ActionIcon>
      <Send className="size-6" />
    </ActionIcon>
  );
};
