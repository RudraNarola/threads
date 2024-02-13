import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { getLoggedUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const loggedUser = await getLoggedUser();

  if (!loggedUser?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id.toString()}
          currentUserId={loggedUser?.id || ""}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.comments}
          userId={loggedUser._id.toString()}
          loggedUserId={loggedUser._id.toString()}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={thread.id}
          currentUserImg={loggedUser.image}
          currentUserId={JSON.stringify(loggedUser._id)}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id.toString()}
            id={childItem._id.toString()}
            currentUserId={loggedUser?.id || ""}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment={true}
            userId={thread.children[0].author._id.toString()}
            loggedUserId={loggedUser._id.toString()}
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
