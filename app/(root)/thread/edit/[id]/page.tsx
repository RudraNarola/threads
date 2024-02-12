import PostThread from "@/components/forms/PostThread";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  const thread = await fetchThreadById(params.id);
  if (JSON.stringify(thread.author._id) !== JSON.stringify(userInfo._id)) {
    return notFound();
  }

  console.log(thread);

  return (
    <>
      <h1 className="head-text mb-4"> Edit Thread</h1>
      <PostThread
        btnTitle="Edit"
        userId={userInfo._id}
        content={thread.text}
        threadId={thread._id}
      />
    </>
  );
};

export default Page;
