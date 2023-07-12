"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

type User = {
  image: string;
};

export default function Logged({ image }: User) {
  return (
    <li className="flex gap-8 items-center">
      <button onClick={() => signOut()}>Sign Out</button>
      <Link href={"/dashboard"}>
        <Image
          height={64}
          width={64}
          src={image}
          alt="Google account image"
          className="w-14 rounded-full"
        ></Image>
      </Link>
    </li>
  );
}
