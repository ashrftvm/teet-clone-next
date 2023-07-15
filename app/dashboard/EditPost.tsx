"use client";

import Image from "next/image";
import { AllPosts } from "../types/AllPosts";
import Toggle from "./Toggle";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

let deleteToastId: string;

export default function EditPost({
  id,
  avatar,
  name,
  title,
  Comment,
}: AllPosts) {
  // Toggle
  const [toggle, setToggle] = useState(false);
  const qc = useQueryClient();
  // Deleting the teet
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.post("/api/posts/deletePost", { data: { postId: id } }),
    {
      onError: (err) => {
        // console.log(err, "ash");
        toast.error("Error in deleting teet ☹️", { id: deleteToastId });
      },
      onSuccess: (res) => {
        // console.log(res);
        toast.success("Successfully deleted teet! 🥳", { id: deleteToastId });
        qc.invalidateQueries(["auth-posts"]);
      },
    }
  );

  const deletePost = () => {
    deleteToastId = toast.loading("Deleting your teet!", { id: deleteToastId });
    mutate(id);
  };

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
          deletePost={deletePost}
          setToggle={setToggle}
        />
      )}
    </div>
  );
}
