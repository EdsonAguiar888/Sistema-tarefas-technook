import { Routes } from '@angular/router';
import { TarefaListaComponent } from './tarefas/TarefaListaComponent/tarefa-lista';
// import { TarefaGerenciadorComponent } from './tarefas/TarefaListaComponent/tarefa-gerenciador';
// import { GraficosEstudoComponent } from './paginas/graficos-estudo/graficos-estudo.component';
import { GraficosEstudoComponent } from '../app/tarefas/graficos-apex/graficos-apex';

export const routes: Routes = [
  // { path: '', component: TarefaGerenciadorComponent },
  { path: '', component: TarefaListaComponent },
  { path: 'graficos-estudo', component: GraficosEstudoComponent }
  // { path: 'tarefas', component: TarefaListaComponent },
];
