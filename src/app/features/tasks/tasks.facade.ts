import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, tap, throwError } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';
import { Task } from '../../core/models/task.model';
import { TasksApiService } from '../../core/services/tasks.service';

@Injectable({ providedIn: 'root' })
export class TasksFacade {
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);

  readonly tasks$ = this.tasksSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();
  readonly error$ = this.errorSubject.asObservable();

  private taskService = inject(TasksApiService);
  private toast = inject(ToastService);

  loadAll() {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.taskService
      .getAll()
      .pipe(
        tap((tasks) => this.tasksSubject.next(tasks)),
        catchError((err) => {
          this.errorSubject.next('Failed to load tasks');
          return throwError(() => err);
        }),
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe();
  }

  loadByRisk(riskId: number | string) {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.taskService
      .getByRiskId(riskId)
      .pipe(
        tap((tasks) => this.tasksSubject.next(tasks)),
        catchError((err) => {
          this.errorSubject.next('Failed to load tasks for risk');
          return throwError(() => err);
        }),
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe();
  }

  createTask(payload: Omit<Task, 'id'>) {
    this.loadingSubject.next(true);
    this.taskService
      .create(payload)
      .pipe(
        tap((created) => {
          const current = this.tasksSubject.value;
          this.tasksSubject.next([...current, created]);
          this.toast.success('Task created');
        }),
        catchError((err) => {
          this.toast.error('Failed to create task');
          return throwError(() => err);
        }),
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe();
  }

  updateTask(id: number, payload: Partial<Task>) {
    this.taskService
      .update(id, payload)
      .pipe(
        tap((updated) => {
          const current = this.tasksSubject.value;
          this.tasksSubject.next(current.map((t) => (t.id === id ? updated : t)));
          this.toast.success('Task updated');
        }),
        catchError((err) => {
          this.toast.error('Failed to update task');
          return throwError(() => err);
        }),
      )
      .subscribe();
  }

  deleteTask(id: number) {
    this.taskService
      .delete(id)
      .pipe(
        tap(() => {
          this.tasksSubject.next(this.tasksSubject.value.filter((t) => t.id !== id));
          this.toast.success('Task deleted');
        }),
        catchError((err) => {
          this.toast.error('Failed to delete task');
          return throwError(() => err);
        }),
      )
      .subscribe();
  }
}
