// src/app/tarefas/tarefa.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarefa {  //Acrecentado a interface para corrigir erro de importacao de Tarefa em tarefa-lista.ts
  id: number;
  titulo: string;
  descricao: string;
  concluida: boolean;
}

@Injectable({ providedIn: 'root' })
export class TarefaService {
  private apiUrl = 'http://localhost:3000/tarefas';
 
  constructor(private http: HttpClient) {}
 
  listarTodas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
 
  criar(tarefa: { titulo: string; descricao: string }): Observable<any> {
    return this.http.post(this.apiUrl, tarefa);
  }
}