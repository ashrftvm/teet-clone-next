export type AllPosts = {
  id: string;
  avatar: string;
  title: string;
  name: string;
  Comment?: {
    id: string;
    comment: string;
    createdAt: string;
  }[];
};
