import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import type { User, UserRole } from '../models/user.model';
import { Session } from '../models/session.model';
import { environment } from '../../environments/environments';

type LoginResponse = { user: User; session: Session };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'mini_grc_session_v1';

  private readonly sessionSubject = new BehaviorSubject<Session | null>(null);
  readonly session$ = this.sessionSubject.asObservable();

  readonly user$ = this.session$.pipe(map((s) => s?.user ?? null));

  constructor(private http: HttpClient) {
    this.restoreSession();
  }

  /** Login via json-server: GET /users?email=...&password=... */
  login(email: string, password: string): Observable<LoginResponse> {
    const url = `${environment.apiUrl}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    return this.http.get<User[]>(url).pipe(
      map((users) => {
        const user = users?.[0];
        if (!user) throw new Error('Invalid credentials');

        // fake token + expiry
        const token = `fake-jwt-${user.id}-${Date.now()}`;
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

        const session = new Session(token, expiresAt, user);
        return { user, session };
      }),
      tap(({ session }) => this.setSession(session)),
      catchError((err) => {
        const msg = err?.message ?? 'Login failed';
        return throwError(() => new Error(msg));
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.sessionSubject.next(null);
  }

  getSession(): Session | null {
    return this.sessionSubject.value;
  }

  isAuthenticated(): boolean {
    const s = this.getSession();
    return !!s && s.isValid();
  }

  hasRole(role: UserRole): boolean {
    const s = this.getSession();
    return !!s && s.isValid() && s.user.role === role;
  }

  restoreSession(): void {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return;

    try {
      const obj = JSON.parse(raw) as { token: string; expiresAt: string; user: any };
      const session = new Session(obj.token, new Date(obj.expiresAt), obj.user);

      if (!session.isValid()) {
        localStorage.removeItem(this.STORAGE_KEY);
        return;
      }

      this.sessionSubject.next(session);
    } catch {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  private setSession(session: Session): void {
    this.sessionSubject.next(session);
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify({
        token: session.token,
        expiresAt: session.expiresAt.toISOString(),
        user: session.user,
      }),
    );
  }
}
