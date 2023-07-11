import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { POST_LENGTH } from "@/app/components/AddPost";
import prisma from "../../../prisma/client";

export default async function addPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res
        .status(401)
        .json({ message: "Please sign in to make a teet!" });

    // console.log(req.body);

    const title: string = req.body.title;
    if (title.length > POST_LENGTH || title.length === 0) {
      return res.status(403).json({
        message:
          "Teet shouldn't exceed maximum allowed size or need atleast one character.",
      });
    }

    const prismaUser = await prisma?.user.findUnique({
      where: { email: session.user?.email || "" },
    });

    try {
      const result = await prisma?.post.create({
        data: {
          title,
          userId: prismaUser?.id || "",
        },
      });
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(403)
        .json({ message: "An error occured while creating a teet." });
    }
  }
}
