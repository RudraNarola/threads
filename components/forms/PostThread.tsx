"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread, updateThread } from "@/lib/actions/thread.actions";
import { useOrganization } from "@clerk/nextjs";

// import { updateUser } from "@/lib/actions/user.actions";

interface Props {
  userId: string;
  btnTitle: string;
  content: string | "";
  threadId?: string | "";
}

function PostThread({ userId, btnTitle, content, threadId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: content,
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    if (threadId) {
      await updateThread({
        threadId: threadId,
        text: values.thread,
        path: pathname,
        communityId: organization ? organization.id : null,
      });
      router.back();
      router.refresh();
    } else {
      await createThread({
        text: values.thread,
        author: userId,
        communityId: organization ? organization.id : null,
        path: pathname,
      });
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form
        className=" flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
          {btnTitle}
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
