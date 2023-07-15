"use client";

import { useState } from "react";
import { POST_LENGTH } from "@/app/components/AddPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

let commentAddToast: string;
type Props = {
  id?: string;
};

type Comment = {
  title: string;
  id?: string;
};

type ErrorMessage = {
  message: string;
};

export default function AddComment({ id }: Props) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (data: Comment) => axios.post("/api/posts/addComment", { data }),
    {
      onError: (error: AxiosError) => {
        setIsDisabled(false);
        toast.error((error.response?.data as ErrorMessage).message, {
          id: commentAddToast,
        });
        console.log(error);
      },
      onSuccess: (data) => {
        setIsDisabled(false);
        setTitle("");
        queryClient.invalidateQueries(["post-detail"]);
        toast.success("Successfully added comment!", { id: commentAddToast });
        console.log(data);
      },
    }
  );

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    commentAddToast = toast.loading(
      "Please wait while we add your comment... 🏃🏼",
      { id: commentAddToast }
    );
    mutate({ title, id });
  };

  return (
    <form
      onSubmit={submitComment}
      className="my-8"
    >
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2 text-gray-700">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          name="title"
          placeholder="Comment..."
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          className="text-sm bg-teal-600 text-white py-2 px-6"
          disabled={isDisabled}
        >
          Add Comment 💬
        </button>
        <p
          className={`font-bold ${
            title.length > 500 ? "text-red-700" : "text-gray-700"
          }`}
        >
          {title.length}/{POST_LENGTH}
        </p>
      </div>
    </form>
  );
}
