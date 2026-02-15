import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../../environments/environments';

export type CreateTaskDto = Omit<Task, 'id'>;
export type UpdateTaskDto = Partial<Omit<Task, 'id'>>;

@Injectable({ providedIn: 'root' })
export class TasksApiService {
  private readonly baseUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  getByRiskId(riskId: string | number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}?riskId=${encodeURIComponent(String(riskId))}`);
  }

  create(dto: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, dto);
  }

  update(id: number, dto: UpdateTaskDto): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
