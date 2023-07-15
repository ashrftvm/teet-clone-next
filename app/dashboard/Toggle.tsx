"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  deletePost: () => void;
  setToggle: (toggle: boolean) => void;
};

export default function Toggle({ deletePost, setToggle }: Props) {
  return (
    <div
      onClick={() => setToggle(false)}
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0"
    >
      <div className="absolute bg-white text-gray-700 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex items-center flex-col gap-6">
        <h2 className="text-xl">Are you sure you want to delete? 💔</h2>
        <h3 className="text-sm text-red-600">
          Confirming will permanently delete this!
        </h3>
        <button
          onClick={deletePost}
          className="rounded-md px-4 py-2 text-white text-sm bg-red-600"
        >
          Yes, Delete!
        </button>
      </div>
    </div>
  );
}
