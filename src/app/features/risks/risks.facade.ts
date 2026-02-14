import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, tap, throwError } from 'rxjs';

import { ToastService } from '../../core/services/toast.service';
import { RisksApiService } from '../../core/services/risks.service';
import { Risk } from '../../core/models/risk.model';

@Injectable({ providedIn: 'root' })
export class RisksFacade {
  private readonly risksSubject = new BehaviorSubject<Risk[]>([]);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);

  readonly risks$ = this.risksSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();
  readonly error$ = this.errorSubject.asObservable();

  private risksService = inject(RisksApiService);
  private toast = inject(ToastService);

  loadRisks() {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.risksService
      .getAll()
      .pipe(
        tap((risks) => this.risksSubject.next(risks)),
        catchError((err) => {
          this.errorSubject.next('Failed to load risks');
          return throwError(() => err);
        }),
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe();
  }

  createRisk(payload: Omit<Risk, 'id'>) {
    this.loadingSubject.next(true);

    this.risksService
      .create(payload)
      .pipe(
        tap(() => this.loadRisks()),
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe();
  }

  updateRisk(id: number, payload: Partial<Risk>) {
    this.risksService
      .update(id, payload)
      .pipe(
        tap((updated) => {
          const current = this.risksSubject.value;
          const updatedList = current.map((r) => (r.id === id ? updated : r));
          this.risksSubject.next(updatedList);
          this.toast.success('Risk updated');
        }),
        catchError((err) => {
          this.toast.error('Failed to update risk');
          return throwError(() => err);
        }),
      )
      .subscribe();
  }

  deleteRisk(id: number) {
    this.risksService
      .delete(id)
      .pipe(
        tap(() => {
          const filtered = this.risksSubject.value.filter((r) => r.id !== id);
          this.risksSubject.next(filtered);
          this.toast.success('Risk deleted');
        }),
        catchError((err) => {
          this.toast.error('Failed to delete risk');
          return throwError(() => err);
        }),
      )
      .subscribe();
  }
}
