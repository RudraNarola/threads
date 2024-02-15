import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser, getActivity } from "@/lib/actions/user.actions";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const { replies, likedUsers } = await getActivity(userInfo._id);

  return (
    <>
      <h1 className="head-text">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {replies.length > 0 ? (
          <>
            {replies.map((replie) => (
              <Link key={replie._id} href={`/thread/${replie.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={replie.author.image}
                    alt="user_logo"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1 flex gap-1">
                    <span className="mr-1 text-primary-500">
                      {replie.author.name}
                    </span>{" "}
                    <Image
                      src={"/assets/reply.svg"}
                      alt="heart"
                      height={20}
                      width={20}
                    />
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
            {likedUsers.map((user) => (
              <Link key={user._id} href={`/thread/${user.id}`}>
                <article className="activity-card">
                  <Image
                    src={user.image}
                    alt="user_logo"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1 flex gap-1">
                    <span className="mr-1 text-primary-500">{user.name}</span>{" "}
                    <Image
                      src={"assets/heart-filled.svg"}
                      alt="heart"
                      height={20}
                      width={20}
                    />
                    like to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </>
  );
}

export default Page;
