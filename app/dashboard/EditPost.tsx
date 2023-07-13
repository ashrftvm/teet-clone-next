"use client";

import Image from "next/image";
import { AllPosts } from "../types/AllPosts";
import Toggle from "./Toggle";
import { useState } from "react";

export default function EditPost({
  id,
  avatar,
  name,
  title,
  Comment,
}: AllPosts) {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          width={32}
          height={32}
          src={avatar}
          alt="Avatar image"
          className="rounded-full"
        ></Image>
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all text-gray-800">{title}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm font-bold text-gray-700">
          {Comment?.length} Comments
        </p>
        <button
          onClick={() => setToggle(true)}
          className="text-sm font-bold text-red-500"
        >
          Delete
        </button>
      </div>
      {toggle && (
        <Toggle
          postId={id}
          setToggle={setToggle}
        />
      )}
    </div>
  );
}
