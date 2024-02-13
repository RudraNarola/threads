import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface Props {
  currentUserId: string;
  accountId: string;
  loggedUserId: string;
  accountType: string;
}

// currentuserId => MongoDb ID
const ThreadsTab = async ({
  currentUserId,
  accountId,
  accountType,
  loggedUserId,
}: Props) => {
  let result: any;

  if (accountType === "community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(currentUserId);
  }
  // if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id.toString()}
          id={thread._id.toString()}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType == "User"
              ? {
                  name: result.name,
                  image: result.image,
                  id: result.id,
                  _id: result._id,
                }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                  _id: thread.author._id,
                }
          }
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.comments}
          userId={accountId}
          loggedUserId={loggedUserId}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
