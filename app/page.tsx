"use client";

import axios from "axios";
import AddPost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Post";
import { PostType } from "./types/Post";

const getPosts = async () => {
  const results = await axios.get("/api/posts/getPosts");
  // console.log(results);
  return results.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: getPosts,
    queryKey: ["posts"],
  });
  if (error) return error;
  if (isLoading) return "Loading...";
  console.log(data);
  return (
    <main>
      <h1>Hello next</h1>
      <AddPost></AddPost>
      {data?.map((post: PostType) => (
        <Post
          key={post.id}
          comments={post.Comment}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          id={post.id}
        />
      ))}
    </main>
  );
}
