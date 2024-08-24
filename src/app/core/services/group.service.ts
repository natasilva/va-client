import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  private url = environment.api

  get(params: any = {}): Observable<any> {
    return this.http.get<any>(`${this.url}/group`, { params })
  }
}
