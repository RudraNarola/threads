import { fetchUsers, getLoggedUser } from "@/lib/actions/user.actions";
import UserCard from "../cards/UserCard";

const SuggestedUser = async () => {
  const user = await getLoggedUser();
  const { users: suggestedUsers, isNext } = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });
  return (
    <>
      <h3 className="text-heading4-medium text-light-1 mb-4">
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
