"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const POST_LENGTH = 500;
let toastPostID: string;

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();

  // create a post
  const { mutate } = useMutation(
    async (title: string) => {
      return await axios.post("/api/posts/addPost", { title });
    },
    {
      onError: (err) => {
        if (err instanceof AxiosError) {
          toast.error(err?.response?.data.message, { id: toastPostID });
          // console.log(toastPostID, "error");
        }
        setIsDisabled(false);
      },
      onSuccess: (res) => {
        setTitle("");
        setIsDisabled(false);
        queryClient.invalidateQueries(["posts"]);
        // console.log(res);
        console.log(toastPostID, "success");
        toast.success("Successfully created 🔥", { id: toastPostID });
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostID = toast.loading("Publishing your teet ✈️", { id: toastPostID });
    console.log(toastPostID);
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <form
      className="my-8 rounded-md"
      onSubmit={submitPost}
    >
      <div className="flex flex-col my-4">
        <textarea
          name="title"
          value={title}
          className="p-4 text-lg text-black rounded-md my-2 bg-gray-200"
          placeholder="What's cooking?"
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > POST_LENGTH ? `text-red-700` : "text-grey-700"
          }`}
        >{`${title.length}/${POST_LENGTH}`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6"
        >
          Create a teet
        </button>
      </div>
    </form>
  );
}
