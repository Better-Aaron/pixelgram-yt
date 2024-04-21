"use client";

import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import useMount from "@/hooks/use-mount";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CreatePostSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { useTransition } from "react";
import { createPost } from "@/actions/post";

export const CreatePostForm = () => {
  const pathname = usePathname();
  const isCreatePage = pathname === "/dashboard/create";
  const router = useRouter();
  const mount = useMount();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      caption: "",
      fileUrl: undefined,
    },
  });

  const fileUrl = form.watch("fileUrl");

  const onSubmit = async (values: z.infer<typeof CreatePostSchema>) => {
    startTransition(() => {
      createPost(values).then((data) => {
        console.log(data);
      });
    });
  };

  if (!mount) return null;

  return (
    <div>
      <Dialog
        open={isCreatePage}
        onOpenChange={(open) => !open && router.back()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Post</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {!!fileUrl ? (
                <div className="h-96 md:h-[450px] overflow-hidden rounded-md">
                  <AspectRatio ratio={1 / 1} className="relative h-full">
                    <Image
                      src={fileUrl}
                      alt="Post preview"
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel htmlFor="picture">Picture</FormLabel>
                      <FormControl>
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            // Do something with the response
                            form.setValue("fileUrl", res[0].url);
                            toast.success("Upload complete");
                          }}
                          onUploadError={(error: Error) => {
                            console.error(error);
                            toast.error("Upload failed");
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload a picture to post.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              )}

              {!!fileUrl && (
                <FormField
                  control={form.control}
                  name="caption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="caption">Caption</FormLabel>
                      <FormControl>
                        <Input
                          type="caption"
                          id="caption"
                          placeholder="Write a caption..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Create Post
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
