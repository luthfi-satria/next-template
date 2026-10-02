export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  user: Pick<User, 'id' | 'name' | 'email' | 'role'>;
  token?: string;
}
