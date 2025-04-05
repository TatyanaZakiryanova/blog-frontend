import { Status } from '../posts/types';

export interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
}

export interface UserData {
  email: string;
  password: string;
}

export interface UserState {
  data: AuthUser | null;
  status: Status;
  error: null | string;
}
