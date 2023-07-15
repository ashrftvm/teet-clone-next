import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({ message: "You are not authorised!" });

    try {
      const prismaUser = await prisma.user.findUnique({
        where: { email: session.user?.email || "" },
      });
      const { title, id } = req.body.data;
      //   console.log(title, id, req.body.data);
      if (!title.length) {
        return res.status(401).json({ message: "Please enter some comments!" });
      }
      const result = await prisma.comment.create({
        data: {
          comment: title,
          postId: id,
          userId: prismaUser?.id as string,
        },
      });
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(403)
        .json({ message: "Some error occured in adding your comments!" });
    }
  }
}
