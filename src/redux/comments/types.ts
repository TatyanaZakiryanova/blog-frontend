import { AuthUser } from '../auth/types';
import { Post, Status } from '../posts/types';

export interface Comment {
  _id: string;
  text: string;
  post: string | Post;
  user: string | AuthUser;
  createdAt: string;
  updatedAt: string;
}

export interface CommentsState {
  items: Comment[];
  status: Status;
}
