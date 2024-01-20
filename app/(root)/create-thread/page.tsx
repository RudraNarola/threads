import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import PostThread from "@/components/forms/PostThread";

async function page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  //   console.log("USERINFO: ", userInfo);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <>
      <h1 className="head-text"> Create Thread</h1>
      <PostThread userId={userInfo._id} />
    </>
  );
}

export default page;
