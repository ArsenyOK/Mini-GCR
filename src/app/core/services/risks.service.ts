import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Risk } from '../models/risk.model';
import { environment } from '../../environments/environments';

export type CreateRiskDto = Omit<Risk, 'id'>;
export type UpdateRiskDto = Partial<Omit<Risk, 'id'>>;

@Injectable({ providedIn: 'root' })
export class RisksApiService {
  private readonly baseUrl = `${environment.apiUrl}/risks`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Risk[]> {
    return this.http.get<Risk[]>(this.baseUrl);
  }

  getById(id: number): Observable<Risk> {
    return this.http.get<Risk>(`${this.baseUrl}/${id}`);
  }

  create(dto: CreateRiskDto): Observable<Risk> {
    return this.http.post<Risk>(this.baseUrl, dto);
  }

  update(id: number, dto: UpdateRiskDto): Observable<Risk> {
    return this.http.patch<Risk>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
