export interface IPostAuthor {
  avatarUrl?: string;
  fullName: string;
}

export interface IPostProps {
  _id: number;
  title: string;
  createdAt: string;
  imageUrl: string;
  user: IPostAuthor;
  viewsCount: number;
  commentsCount: number;
  tags: string[];
  children?: React.ReactNode;
  isFullPost: boolean;
  isLoading: boolean;
  isEditable: boolean;
}
