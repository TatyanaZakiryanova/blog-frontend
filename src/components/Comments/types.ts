export interface ICommentUser {
  id: number;
  user: {
    id: number;
    fullName: string;
    avatarUrl: string | null;
  };
  text: string;
}

export interface ICommentsProps {
  postId: number;
}
