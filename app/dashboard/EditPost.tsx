"use client";

import Image from "next/image";
import { AllPosts } from "../types/AllPosts";

export default function EditPost({
  id,
  avatar,
  name,
  title,
  comments,
}: AllPosts) {
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div>
        <Image
          width={32}
          height={32}
          src={avatar}
          alt="Avatar image"
        ></Image>
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
    </div>
  );
}
