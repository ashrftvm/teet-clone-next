export type AllPosts = {
  id: string;
  avatar: string;
  title: string;
  name: string;
  comments?: {
    id: string;
    comment: string;
    createdAt: string;
  }[];
};
