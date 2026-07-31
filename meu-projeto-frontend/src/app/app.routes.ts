import { Routes } from '@angular/router';
import { TarefaListaComponent } from './tarefas/tarefa-lista/tarefa-lista';

export const routes: Routes = [
  { path: '', component: TarefaListaComponent },
  { path: 'tarefas', component: TarefaListaComponent },
];
