import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { Hero } from '../interfaces/hero.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getHerores(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }
}
