import { Status } from '../posts/types';

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
}

export interface AuthResponse {
  message: string;
  data: AuthUser;
}

export interface UserDataLogin {
  email: string;
  password: string;
}

export interface UserDataRegister {
  email: string;
  password: string;
  fullName: string;
  avatarUrl: string | null;
}

export interface UserData {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserDataResponse {
  message: string;
  data: UserData;
}

export interface UserState {
  data: UserData | null;
  status: Status;
  authError: {
    status: number;
    message: string;
  } | null;
}
