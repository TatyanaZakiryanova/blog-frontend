import { Status } from '../posts/types';

export interface TagsState {
  items: string[];
  status: Status;
  error: null | string;
}
