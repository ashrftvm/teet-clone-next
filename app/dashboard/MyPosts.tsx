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
  //   console.log(data);
  return (
    <div>
      {data?.posts?.map((post: AllPosts) => (
        <EditPost
          key={post.id}
          id={post.id}
          avatar={data.user.image}
          title={post.title}
          name={data.user.name}
          Comment={post.Comment}
        ></EditPost>
      ))}
    </div>
  );
}
