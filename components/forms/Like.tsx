"use client";
import {
  addLikeToThread,
  fetchNumberOfLikes,
  isLikedByUser,
} from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { set } from "mongoose";
import Image from "next/image";
import { use, useEffect, useState } from "react";

interface Props {
  threadId: string;
  userId: string;
}
function Like({ threadId, userId }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);

  async function isLike() {
    const result = await isLikedByUser(threadId, userId);
    console.log("Is liked by user", result);
    setIsLiked(result);
  }

  async function addLikes() {
    addLikeToThread(threadId, userId, !isLiked);
  }
  async function fetchNoOfLikes() {
    const result = await fetchNumberOfLikes(threadId);
    setNumberOfLikes(result);
  }

  useEffect(() => {
    isLike();
    fetchNoOfLikes();
  }, []);

  async function handleLike() {
    addLikes();
    setIsLiked(!isLiked);
    setNumberOfLikes(isLiked ? numberOfLikes - 1 : numberOfLikes + 1);
  }

  return (
    <div className="flex gap-2  items-center" onClick={handleLike}>
      <Image
        src={`/assets/heart-${isLiked ? "filled" : "gray"}.svg`}
        alt="Heart"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
      />
      <span className="text-light-3 text-small-regular">{numberOfLikes}</span>
    </div>
  );
}

export default Like;
