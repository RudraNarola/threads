import Link from "next/link";
import Image from "next/image";
import { formatDateString } from "@/lib/utils";
import Like from "../forms/Like";
import {
  fetchNumberOfLikes,
  isLikedByUser,
} from "@/lib/actions/thread.actions";

import DropDownMenu from "./DropDownMenu";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
    _id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  userId: string;
  isComment?: boolean;
  loggedUserId: string;
}

const ThreadCard = async ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  userId,
  isComment,
  loggedUserId,
}: Props) => {
  // currentuserId => MongoDb ID

  const result = await isLikedByUser(JSON.stringify(id), userId);
  const numberOfLikes = await fetchNumberOfLikes(id);

  return (
    <article
      className={`flex w-full flex-col rounded-xl mb-2
      ${isComment ? "px-0 xs:px-7:" : "bg-dark-2 p-7"} `}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile Picture"
                fill
                className="rounded-full cursor-pointer object-cover"
              />
            </Link>
            <div className="thread-card_bar"></div>
          </div>

          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between w-full">
              <Link href={`/profile/${author.id}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {author.name}
                </h4>
              </Link>
              {JSON.stringify(author._id) === JSON.stringify(loggedUserId) && (
                <>
                  <DropDownMenu id={id} />
                </>
              )}
            </div>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`${isComment && "mb-1"} mt-3 flex flex-row gap-3`}>
              <Like
                isLikedByUser={result}
                threadId={id}
                currentUserId={currentUserId}
                userId={userId}
                numberOfLikes={numberOfLikes}
              />

              <Link
                href={`/thread/${id}`}
                className="flex gap-1 flex-row items-center"
              >
                <Image
                  src="/assets/reply.svg"
                  alt="Reply"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                {comments && comments.length > 0 && (
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                )}
              </Link>

              <div className="flex gap-3.5">
                <Image
                  src="/assets/repost.svg"
                  alt="Repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>
              <div className="flex gap-3.5">
                <Image
                  src="/assets/share.svg"
                  alt="Share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*] Delete Thrread */}
      {/*] Show comment logos */}

      {!isComment && community ? (
        <Link
          href={`/communities/${community.id}`}
          className="mt-3 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)} - {community.name} Community
          </p>
          <Image
            src={community.image}
            alt="Community Image"
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      ) : (
        <Link
          href={`/profile/${currentUserId}`}
          className="mt-3 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)}
          </p>
        </Link>
      )}
    </article>
  );
};

export default ThreadCard;
