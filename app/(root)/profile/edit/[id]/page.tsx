import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  if (!user) return null;

  // // user whose profile is being viewed
  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  if (user.id != userInfo.id) {
    return notFound();
  }

  console.log(userInfo);

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return <AccountProfile user={userData} btnTitle="Edit" />;
};

export default Page;
