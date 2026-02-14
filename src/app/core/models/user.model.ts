export type UserRole = 'admin' | 'manager' | 'viewer' | 'user';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}
