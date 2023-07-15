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
    if (!session) return res.status(401).json({ message: "Not authorised." });

    try {
      const data = await prisma.post.delete({
        where: {
          id: req.body.data.postId,
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      return res
        .status(403)
        .json({ message: "Some error occured in deleting post" });
    }
  }
}
