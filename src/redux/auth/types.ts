import { Status } from '../posts/types';

export interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}

export interface UserData {
  email: string;
  password: string;
}

export interface UserDataRegister extends UserData {
  fullName: string;
}

export interface UserState {
  data: AuthUser | null;
  status: Status;
}
