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
    if (!session) return res.status(401).json({ message: "Please sign in!" });
    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session.user?.email || "",
      },
    });
    try {
      const data = await prisma.comment.deleteMany({
        where: {
          AND: {
            id: req.body.data.id,
            userId: prismaUser?.id,
          },
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      return res
        .status(403)
        .json({ message: "Some error occured in deleting." });
    }
  }
}
