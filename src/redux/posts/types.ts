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
  posts: {
    items: Post[];
    status: string;
  };
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
