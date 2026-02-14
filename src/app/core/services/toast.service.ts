import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../models/toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly toastsSubject = new BehaviorSubject<Toast[]>([]);
  readonly toasts$ = this.toastsSubject.asObservable();

  private readonly DEFAULT_DURATION = 3000;

  display(message: string, type: Toast['type'] = 'info', duration?: number) {
    const toast: Toast = {
      id: crypto.randomUUID(),
      message,
      type,
      duration: duration ?? this.DEFAULT_DURATION,
    };

    const current = this.toastsSubject.value;
    this.toastsSubject.next([...current, toast]);

    setTimeout(() => {
      this.remove(toast.id);
    }, toast.duration);
  }

  success(message: string) {
    this.display(message, 'success');
  }

  error(message: string) {
    this.display(message, 'error');
  }

  info(message: string) {
    this.display(message, 'info');
  }

  remove(id: string) {
    const filtered = this.toastsSubject.value.filter((t) => t.id !== id);
    this.toastsSubject.next(filtered);
  }
}
