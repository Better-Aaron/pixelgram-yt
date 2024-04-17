import { Heart, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { calSans } from "@/app/fonts";

export const Header = () => {
  return (
    <header className="top-0 fixed z-50 flex w-full items-center justify-between border-b border-zinc-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-950 sm:-ml-6 md:hidden">
      <Link href={"/dashboard"}>
        <p className={`text-xl font-semibold ${calSans.className}`}>
          Pixelgram
        </p>
      </Link>

      <div className="flex items-center space-x-2">
        <div className="flex items-center gap-x-2 rounded-md bg-zinc-100 px-3.5 py-1.5 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
          <Search className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent outline-none placeholder:text-neutral-600 dark:placeholder:text-neutral-400"
          />
        </div>

        <Button size={"icon"} variant={"ghost"}>
          <Heart />
        </Button>
      </div>
    </header>
  );
};
