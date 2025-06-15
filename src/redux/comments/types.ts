import { Status } from '../posts/types';

export interface Comment {
  id: number;
  text: string;
  postId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    fullName: string;
    avatarUrl: string | null;
  };
}

export interface CommentsResponse {
  message: string;
  data: Comment[];
}

export interface CommentsState {
  items: Comment[];
  status: Status;
}
