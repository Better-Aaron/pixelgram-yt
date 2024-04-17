import { cn } from "@/lib/utils";
import { SwitchCamera } from "lucide-react";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1
        className={cn(
          "flex items-center space-x-4 text-3xl font-semibold",
          font.className,
        )}
      >
        <SwitchCamera className="h-6 w-6 shrink-0 lg:hidden" />
        <span>Auth</span>
      </h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
