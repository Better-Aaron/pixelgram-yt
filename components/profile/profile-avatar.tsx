"use client";

import { UserWithExtras } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UpdateUserSchema } from "@/schemas/index";
import { useRef, useState } from "react";
import useMount from "@/hooks/use-mount";
import { UserAvatar } from "../auth/user-avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
interface ProfileAvatarProps {
  user: UserWithExtras;
  children: React.ReactNode;
}

export const ProfileAvatar = ({ user, children }: ProfileAvatarProps) => {
  const { data: session } = useSession();
  const isCurrentUser = session?.user.id === user.id;

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      id: user.id,
      image: user.image || "",
      name: user.name || "",
      username: user.username || "",
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const mount = useMount();

  const onSubmit = async () => {};

  if (!mount || !session) return null;
  if (!isCurrentUser) {
    return <UserAvatar user={user} className="size-20 md:size-36" />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="dialogContent">
        <DialogHeader>
          <DialogTitle className="mx-auto font-medium text-xl py-5">
            Change Profile Photo
          </DialogTitle>
        </DialogHeader>

        {isCurrentUser && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <UploadButton
                        className=""
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {}}
                        onUploadError={(error: Error) => {
                          console.error(error);
                          toast.error("Upload Failed");
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
