export interface ICommentUser {
  user: {
    fullName: string;
    avatarUrl?: string;
  };
  text: string;
}
