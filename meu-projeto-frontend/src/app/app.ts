import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TarefaListaComponent } from './tarefas/TarefaListaComponent/tarefa-lista';

// 1. Importe RouterLink e RouterLinkActive


@Component({
  selector: 'app-root',
  imports:
    [
      // TarefaListaComponent,
      RouterOutlet,
      RouterLink, 
      RouterLinkActive
      
    ],
  // template: '<router-outlet></router-outlet>',
  templateUrl: './app.html',

  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('meu-projeto-frontend');
}
