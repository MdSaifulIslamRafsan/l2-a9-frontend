type TUser = {
  email: string;
  name: string;
  role: "USER" | "ADMIN" | string;
  username: string;
};

type TReply = {
  id: string;
  content: string;
  reviewId: string;
  parentId: string;
  createdAt: string;
  updatedAt: string;
  user: TUser;
};

export type TComment = {
  id: string;
  content: string;
  parentId: string | null;
  userId: string;
  reviewId: string;
  createdAt: string;
  updatedAt: string;
  user: TUser;
  replies: TReply[];
  _count: {
    replies: number;
  };
};
