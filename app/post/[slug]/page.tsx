"use client";

import Post from "@/app/components/Post";
import { PostType } from "@/app/types/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddComment from "./AddComment";

import EachComment from "./EachComment";

const fetchPostDetail = async (slug: string) => {
  const res = await axios.get(`/api/posts/${slug}`);
  return res.data;
};

type URL = {
  params: {
    slug: string;
  };
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType>({
    queryFn: () => fetchPostDetail(url.params.slug),
    queryKey: ["post-detail"],
  });
  if (isLoading) return "Loading teet details!";

  return (
    <div>
      <Post
        id={data?.id || ""}
        avatar={data?.user.image || ""}
        name={data?.user.name || ""}
        title={data?.title || ""}
        Comment={data?.Comment}
      ></Post>
      <AddComment id={data?.id} />
      {data?.Comment?.map((comment) => (
        <EachComment
          key={comment.id}
          id={comment.id}
          avatar={comment.user.image}
          name={comment.user.name}
          createdAt={comment.createdAt}
          comment={comment.comment}
        />
      ))}
    </div>
  );
}
