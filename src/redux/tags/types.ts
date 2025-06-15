import { Status } from '../posts/types';

export interface TagsResponse {
  message: string;
  data: string[];
}
export interface TagsState {
  items: string[];
  status: Status;
}
