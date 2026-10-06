import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RecordItem } from '../models/record.model';

const API_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class RecordService {
  private http = inject(HttpClient);

  list(delayMs = 0) {
    const params = new HttpParams().set('delay', delayMs);
    return this.http.get<RecordItem[]>(`${API_URL}/records`, { params });
  }
}
