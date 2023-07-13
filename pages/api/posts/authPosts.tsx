import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Please sign in!" });

    try {
      const data = await prisma.user.findUnique({
        where: { email: session.user?.email },
        include: {
          posts: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              Comment: true,
            },
          },
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      return res
        .status(403)
        .json({ message: "Some error occured in getting teets ☹️" });
    }
  }
}
