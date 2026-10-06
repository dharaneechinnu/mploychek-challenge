export type Role = 'admin' | 'user';

export interface User {
  id: string;
  userId: string;
  name: string;
  role: Role;
}

export interface UserPayload {
  userId?: string;
  name?: string;
  password?: string;
  role?: Role;
}

export interface LoginResponse {
  token: string;
  user: User;
}
