"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserCard = ({
  id,
  name,
  username,
  imgUrl,
  personType,
  size = "default",
}: {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
  size?: string;
}) => {
  const router = useRouter();

  {
    return size === "default" ? (
      <article className="user-card">
        <div className="user-card_avatar">
          <Image
            src={imgUrl}
            alt={name}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>

        <Button
          className="user-card_btn"
          onClick={() => {
            router.push(`/profile/${id}`);
          }}
        >
          View
        </Button>
      </article>
    ) : (
      <Link href={`/profile/${id}`}>
        <article className="user-card">
          <div className="user-card_avatar">
            <Image
              src={imgUrl}
              alt={name}
              width={38}
              height={38}
              className="rounded-full"
            />
          </div>

          <div className="flex  flex-col justify-between items-start gap-0.5 text-ellipsis">
            <h4 className="text-base-regular text-light-1">{name}</h4>
            <p className="text-subtle-semibold text-gray-1">@{username}</p>
          </div>
        </article>
      </Link>
    );
  }
};

export default UserCard;
