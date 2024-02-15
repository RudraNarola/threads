import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";
import UserCard from "@/components/cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "@/components/cards/CommunityCard";
import { Input } from "@/components/ui/input";

export default async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  // fetch all  the community
  const result = await fetchCommunities({
    searchString: "",
  });

  return (
    <section>
      <h1 className="head-text mb-4"> Search</h1>
      <Input
        type="text"
        className="account-form_input no-focus"
        placeholder="Search..."
      />

      <div className="mt-10 flex flex-col gap-9">
        {result.communities.length === 0 ? (
          <p className="no-result"> No Community Found</p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
