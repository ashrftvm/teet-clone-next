import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

type UserType = {
  user?: {
    email?: string;
    image?: string;
    name?: string;
    id: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session: UserType | null = await getServerSession(
      req,
      res,
      authOptions
    );
    if (!session) return res.status(401).json({ message: "Please sign in!" });

    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user?.email || "" },
      });
      const data = prisma.post.findMany({
        where: { userId: user?.id },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          Comment: true,
        },
      });
      data.then((posts) => {
        const result = {
          posts,
          user,
        };
        return res.status(200).json(result);
      });
    } catch (error) {
      console.log(error, "hello ash");
      return res
        .status(403)
        .json({ message: "Some error occured in getting teets ☹️" });
    }
  }
}
