"use client";

import { useFormStatus } from "react-dom";
import { ButtonProps } from "@/components/ui/button";

interface SubmitButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} {...props}>
      {children}
    </button>
  );
};
