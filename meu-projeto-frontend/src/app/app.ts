import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { TarefaGerenciadorComponent } from './tarefas/TarefaListaComponent/tarefa-gerenciador';
import { TarefaListaComponent } from './tarefas/TarefaListaComponent/tarefa-lista';

@Component({
  selector: 'app-root',
  imports: 
  [
    TarefaListaComponent,
    RouterOutlet, 
    // TarefaGerenciadorComponent
  ],
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('meu-projeto-frontend');
}
