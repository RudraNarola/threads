import { fetchUsers, getLoggedUser } from "@/lib/actions/user.actions";
import UserCard from "../cards/UserCard";
import { redirect } from "next/navigation";

const SuggestedUser = async () => {
  let user = null;

  try {
    user = await getLoggedUser();
  } catch (error: any) {
    console.log("User not found on clerk", error.message);
    return null;
  }

  if (!user) {
    redirect("/onboarding");
  }
  const { users: suggestedUsers, isNext } = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });
  return (
    <>
      <h3 className="text-base-medium text-light-1 mb-4 text-opacity-60">
        Suggested Users
      </h3>
      <div className="flex flex-col gap-4">
        {suggestedUsers.map((user) => {
          return (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
              imgUrl={user.image}
              personType="User"
              size="small"
            />
          );
        })}
      </div>
    </>
  );
};

export default SuggestedUser;
