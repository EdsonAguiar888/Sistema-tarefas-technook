import { Routes } from '@angular/router';
import { TarefaListaComponent } from './tarefas/TarefaListaComponent/tarefa-lista';
import { GraficosApexComponent } from './tarefas/graficos-apex/graficos-apex';


export const routes: Routes = [
  
  { path: '', component: TarefaListaComponent },
  { path: 'graficos', component: GraficosApexComponent },
  { path: '**', redirectTo: '' }
  
];
