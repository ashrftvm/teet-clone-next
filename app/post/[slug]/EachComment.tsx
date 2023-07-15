"use client";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Toggle from "@/app/dashboard/Toggle";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type ErrorMessage = {
  message: string;
};

type CommentProps = {
  id: string;
  avatar: string;
  name: string;
  createdAt: string;
  comment: string;
};

let deleteCommentToastId: string;

const prettifyTime = (time: string) => {
  const dateObj = new Date(time);
  return dateObj.toLocaleString("en-GB");
};

export default function EachComment({
  id,
  avatar,
  name,
  createdAt,
  comment,
}: CommentProps) {
  const [commentToggle, setCommentToggle] = useState(false);

  const qc = useQueryClient();

  const { mutate } = useMutation(
    async () => {
      await axios.post("/api/posts/deleteComment", {
        data: { id },
      });
    },
    {
      onError: (err: AxiosError) => {
        toast.error((err.response?.data as ErrorMessage).message, {
          id: deleteCommentToastId,
        });
      },
      onSuccess: (msg) => {
        console.log(msg);
        toast.success("Successfully deleted!", { id: deleteCommentToastId });
        qc.invalidateQueries(["post-detail"]);
      },
    }
  );
  const deletePost = () => {
    deleteCommentToastId = toast.loading("Deleting your comment!", {
      id: deleteCommentToastId,
    });
    mutate();
  };

  return (
    <div>
      <div className="bg-white p-8 my-6 rounded-md">
        <div className="flex text-gray-700">
          <div className="flex items-center gap-2 w-2/3">
            <Image
              className="rounded-full"
              width={32}
              height={32}
              src={avatar}
              alt="User avatar"
            ></Image>
            <h3 className="font-bold">{name}</h3>
            <h2 className="text-sm">{prettifyTime(createdAt)}</h2>
          </div>
          <div className="flex justify-end w-1/3">
            <TrashIcon
              onClick={() => {
                setCommentToggle(true);
              }}
              className="h-6 w-6 text-blue-500 float-right cursor-pointer"
            />
          </div>
        </div>
        <div className="py-4 text-gray-700">{comment}</div>
      </div>
      {commentToggle && (
        <Toggle
          deletePost={deletePost}
          setToggle={setCommentToggle}
        />
      )}
    </div>
  );
}
