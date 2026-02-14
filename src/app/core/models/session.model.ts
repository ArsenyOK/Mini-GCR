import type { User } from './user.model';

export class Session {
  constructor(
    public token: string,
    public expiresAt: Date,
    public user: User,
  ) {}

  isValid(): boolean {
    return new Date() < this.expiresAt;
  }

  static fromJSON(raw: string): Session | null {
    try {
      const obj = JSON.parse(raw) as { token: string; expiresAt: string; user: User };
      return new Session(obj.token, new Date(obj.expiresAt), obj.user);
    } catch {
      return null;
    }
  }
}
