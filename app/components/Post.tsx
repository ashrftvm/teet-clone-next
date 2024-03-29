"use client";
import Image from "next/image";
import Link from "next/link";
import { AllPosts } from "../types/AllPosts";

export default function Post({ avatar, name, title, id, Comment }: AllPosts) {
  return (
    <Link href={`/post/${id}`}>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <Image
              className="rounded-full"
              width={32}
              height={32}
              src={avatar}
              alt="avatar"
            />
            <h3 className="font-bold text-gray-700">{name}</h3>
          </div>
          <div className="my-8 text-gray-700">
            <p className="break-all">{title}</p>
          </div>
          <div className="flex gap-4 cursor-pointer items-center">
            <p className="text-sm font-bold text-gray-700">
              {Comment?.length} Comments
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
