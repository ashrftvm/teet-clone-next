import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.post.findUnique({
        where: {
          id: req.query.details,
        },
        include: {
          user: true,
          Comment: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
            },
          },
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      return res
        .status(403)
        .json({ message: "Some error occured in getting data!" });
    }
  }
}
