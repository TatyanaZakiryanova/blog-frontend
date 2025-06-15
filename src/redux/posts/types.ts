export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface Post {
  id: number;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  commentsCount: number;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    fullName: string;
    avatarUrl: string | null;
  };
}

export interface PostResponse {
  message: string;
  data: Post[];
}

export interface PostsState {
  items: Post[];
  status: Status;
}
