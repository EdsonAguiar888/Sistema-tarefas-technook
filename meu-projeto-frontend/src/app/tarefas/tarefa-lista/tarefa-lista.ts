// import { Component, OnInit } from '@angular/core';
 
// @Component({
//   selector: 'app-tarefa-lista',
//   templateUrl:  './tarefa-lista.html',
// })
// export class TarefaListaComponent implements OnInit {
//   tarefas: any[] = [];
 
  


//   ngOnInit(): void {
//     this.carregarTarefas();
//   }
 
//   carregarTarefas(): void {
//     // Buscar da API (veremos isso a seguir)

//     // Inicializa a busca de tarefas quando o componente carrega
   

//   }
// }



// src/app/tarefas/tarefa-lista/tarefa-lista.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para usar o AsyncPipe
import { Observable } from 'rxjs';
import { TarefaService, Tarefa } from '../tarefa.service'; // Acrecentado interface em tarefa.service.ts para corrigir erro de importacao

@Component({
  selector: 'app-tarefa-lista',
  standalone: true,
  imports: [CommonModule], // CommonModule disponibiliza o | async
  templateUrl: './tarefa-lista.html',
  styleUrl: './tarefa-lista.css'
})
export class TarefaListaComponent implements OnInit {
  private tarefaService = inject(TarefaService);

  // Observable que guardará a resposta da API
  tarefas$!: Observable<Tarefa[]>;

  ngOnInit(): void {
    // Inicializa a busca de tarefas quando o componente carrega
    this.tarefas$ = this.tarefaService.listarTodas();
  }
}