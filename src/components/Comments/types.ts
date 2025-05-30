export interface ICommentUser {
  _id: string;
  user: {
    _id: string;
    fullName: string;
    avatarUrl?: string;
  };
  text: string;
}

export interface ICommentsProps {
  postId: string;
}
