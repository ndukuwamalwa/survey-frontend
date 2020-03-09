import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quiz } from './quiz.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  api = `${environment.url}`;
  token = window.sessionStorage.getItem('token');

  constructor(
    private http: HttpClient
  ) { }

  save(quiz: Quiz[]): Observable<any> {
    return this.http.post(`${this.api}/questions?token=${this.token}`, quiz);
  }

  respond(responses: Quiz[]): Observable<any> {
    return this.http.post(`${this.api}/questions/responses`, responses);
  }

  list(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.api}/questions`);
  }

  login(data: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.api}/login`, data);
  }

  update(id: number, question: string): Observable<any> {
    return this.http.put(`${this.api}/questions?token=${this.token}`, { id, question });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/questions?token=${this.token}&id=${id}`);
  }
}
