export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface Post {
  _id: number;
  title: string;
  text: string;
  imageUrl?: string;
  user: {
    avatarUrl?: string;
    fullName: string;
  };
  createdAt: string;
  updatedAt: string;
  viewsCount: number;
  commentsCount: number;
  tags: string[];
}

export interface PostsState {
  items: Post[];
  status: Status;
  error: null | string;
}
