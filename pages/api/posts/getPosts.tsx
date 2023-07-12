import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const result = await prisma?.post.findMany({
        include: {
          user: true,
          Comment: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res
        .status(403)
        .json({ message: "Some error occured while loading teets!" });
    }
  }
}
