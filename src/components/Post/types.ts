import { Post } from '../../redux/posts/types';

export interface IPostProps extends Post {
  children?: React.ReactNode;
  isFullPost: boolean;
  isEditable: boolean;
}
