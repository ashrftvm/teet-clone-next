"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EditPost from "./EditPost";
import { AllPosts } from "../types/AllPosts";

const fetchAuthPosts = async () => {
  const res = await axios.get("/api/posts/authPosts");
  return res.data;
};

export default function MyPosts() {
  const { data, isLoading } = useQuery({
    queryFn: fetchAuthPosts,
    queryKey: ["auth-posts"],
  });
  if (isLoading) return "Your teets are loading... ⌛";
  console.log(data.posts);
  return (
    <div>
      {data?.posts?.map((post: AllPosts) => (
        <EditPost
          key={post.id}
          id={post.id}
          avatar={post.avatar}
          title={post.title}
          name={post.name}
          comments={post.comments}
        ></EditPost>
      ))}
    </div>
  );
}
