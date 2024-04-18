"use client";
import { cn } from "@/lib/utils";
import { type User } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { buttonVariants } from "../ui/button";
import { UserAvatar } from "./user-avatar";

export const ProfileLink = ({ user }: { user: User }) => {
  const pathname = usePathname();
  const href = `/dashboard/${user.id}`;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: isActive ? "secondary" : "ghost",
        className: "navLink",
        size: "lg",
      })}
    >
      <UserAvatar
        user={user}
        className={`size-6 ${isActive && "border-2 border-white"}`}
      />
      <p
        className={`${cn("hidden lg:block", {
          "font-extrabold": isActive,
        })}`}
      >
        Profile
      </p>
    </Link>
  );
};
