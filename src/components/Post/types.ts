import { Post } from '../../redux/posts/types';

export interface IPostProps extends Post {
  isFullPost: boolean;
  isEditable: boolean;
}
