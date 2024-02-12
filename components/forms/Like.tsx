"use client";
import {
  addLikeToThread,
  removeLikeFromThread,
} from "@/lib/actions/thread.actions";
import Image from "next/image";
import { useState } from "react";

interface Props {
  threadId: string;
  userId: string; // monogoDbId
  currentUserId: string;
  isLikedByUser: boolean;
  numberOfLikes: number;
}

function Like({
  threadId,
  userId,
  isLikedByUser,
  currentUserId,
  numberOfLikes,
}: Props) {
  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const [numberOfLikesState, setNumberOfLikesState] = useState(numberOfLikes);

  async function isLike() {
    setIsLiked((prev) => !prev);
  }

  async function likeThread() {
    addLikeToThread(threadId, userId, currentUserId);
  }

  async function unlikeThread() {
    removeLikeFromThread(threadId, userId, currentUserId);
  }

  async function handleLike() {
    if (isLiked) {
      unlikeThread();
    } else {
      likeThread();
    }
    setIsLiked(!isLiked);
    setNumberOfLikesState(
      isLiked ? numberOfLikesState - 1 : numberOfLikesState + 1
    );
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
      <p className="mt-1 text-subtle-medium text-gray-1">
        {numberOfLikesState}
      </p>
    </div>
  );
}

export default Like;
