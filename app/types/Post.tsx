export type PostType = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  title: string;
  published: boolean;
  user: {
    name: string;
    image: string;
  };
  Comment?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
    comment: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
};
