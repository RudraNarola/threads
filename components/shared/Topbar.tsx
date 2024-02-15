import { fetchUser, getLoggedUser } from "@/lib/actions/user.actions";
import {
  currentUser,
  OrganizationSwitcher,
  SignedIn,
  SignOutButton,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";

async function Topbar() {
  const user = await getLoggedUser();
  return (
    <div className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>

      <div className="flex items-center gap-2">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        {/* <UserProfile
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        /> */}
        {/* <Link href={`/profile/${clerkuser.id}`}>
          <Button className="flex gap-2 items-center" variant="ghost">
            <p className="text-heading4-medium-bold ">{userInfo.name}</p>
            <div className="object-cover">
              <Image
                src={userInfo.image}
                alt="Profile Photo"
                height={40}
                width={40}
                className="rounded-full object-cover shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out "
              />
            </div>
          </Button>
        </Link> */}
        <div className="flex items-center gap-4">
          <p className="text-base-medium text-light-1 max-md:hidden">
            {user.name}
          </p>
          <UserButton
            appearance={{
              baseTheme: dark,

              elements: {
                userButtonBox: "w-full",
                avatarBox: "h-12 w-full",
              },
            }}
          />
        </div>

        {/* <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        /> */}
      </div>
    </div>
  );
}

export default Topbar;
