export interface ICommentUser {
  user: {
    fullName: string;
    avatarUrl?: string;
  };
  text: string;
}

export interface ICommentsBlockProps {
  items: ICommentUser[];
  children: React.ReactNode;
  isLoading: boolean;
}
