import { Routes } from '@angular/router';
import { TarefaListaComponent } from './tarefas/TarefaListaComponent/tarefa-lista';
// import { TarefaGerenciadorComponent } from './tarefas/TarefaListaComponent/tarefa-gerenciador';

export const routes: Routes = [
  // { path: '', component: TarefaGerenciadorComponent },
  { path: '', component: TarefaListaComponent },
  // { path: 'tarefas', component: TarefaListaComponent },
];
