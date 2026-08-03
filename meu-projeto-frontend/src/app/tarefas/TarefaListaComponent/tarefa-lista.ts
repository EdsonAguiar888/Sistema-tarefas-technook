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



/// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { TarefaService, Tarefa } from './../tarefa.service';

// @Component({
//   selector: 'app-tarefa-gerenciador',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './tarefa-gerenciador.html',
//   styleUrl: './tarefa-gerenciador.css'
// })
// export class TarefaGerenciadorComponent implements OnInit {
//   private tarefaService = inject(TarefaService);

//   tarefas: Tarefa[] = [];
//   tarefaDetalhes?: Tarefa;

//   // Filtros
//   filtroStatus = '';
//   filtroPrioridade = '';
//   buscaId = '';

//   // Nova Tarefa (Formulário)
//   novaTarefa: Tarefa = {
//     titulo: '',
//     descricao: '',
//     prioridade: 'baixa',
//     status: 'ABERTA'
//   };

//   ngOnInit(): void {
//     this.carregarTarefas();
//   }

//   carregarTarefas(): void {
//     this.tarefaService.listar(this.filtroStatus, this.filtroPrioridade).subscribe({
//       next: (dados) => (this.tarefas = dados),
//       error: (err) => console.error('Erro ao carregar tarefas:', err)
//     });
//   }

//   buscarPorId(): void {
//     if (!this.buscaId.trim()) return;

//     this.tarefaService.buscarPorId(this.buscaId.trim()).subscribe({
//       next: (dados) => (this.tarefaDetalhes = dados),
//       error: () => alert('Tarefa não encontrada!')
//     });
//   }

//   limparBuscaId(): void {
//     this.tarefaDetalhes = undefined;
//     this.buscaId = '';
//   }

//   cadastrarTarefa(): void {
//     if (!this.novaTarefa.titulo.trim()) return;

//     this.tarefaService.criar(this.novaTarefa).subscribe({
//       next: () => {
//         this.carregarTarefas();
//         this.novaTarefa = { titulo: '', descricao: '', prioridade: 'baixa', status: 'ABERTA' };
//       },
//       error: (err) => console.error('Erro ao cadastrar tarefa:', err)
//     });
//   }

//   excluirTarefa(id?: string): void {
//     if (!id || !confirm('Deseja realmente excluir esta tarefa?')) return;

//     this.tarefaService.deletar(id).subscribe({
//       next: () => this.carregarTarefas(),
//       error: (err) => console.error('Erro ao deletar tarefa:', err)
//     });
//   }
// }


// src/app/tarefas/tarefa-lista/tarefa-gerenciador.ts
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarefaService, Tarefa } from '../tarefa.service';

@Component({
  selector: 'app-tarefa-gerenciador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarefa-lista.html',
  styleUrl: './tarefa-lista.css'
})
export class TarefaListaComponent implements OnInit {
  private tarefaService = inject(TarefaService);
  private cd = inject(ChangeDetectorRef); // 2. Injete aqui



  tarefas: Tarefa[] = [];
  tarefaDetalhes?: Tarefa;

  filtroStatus = '';
  filtroPrioridade = '';
  buscaId = '';

  novaTarefa: Tarefa = {
    titulo: '',
    descricao: '',
    prioridade: 'baixa',
    status: 'ABERTA'
  };

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.tarefaService.listar(this.filtroStatus, this.filtroPrioridade).subscribe({
      next: (dados) => {
        console.log('Tarefas recebidas da API:', dados);
        this.tarefas = dados;
        this.cd.detectChanges(); // 3. Força a atualização da tela
      },
      error: (err) => console.error('Erro na requisição GET /tarefas:', err)
    });
  }

  buscarPorId(): void {
    const id = this.buscaId.trim();
    if (!id) {
      alert('Digite um ID para buscar!');
      return;
    }

    console.log('Buscando ID:', id);
    this.tarefaService.buscarPorId(id).subscribe({
      next: (dados) => {
        console.log('Resultado busca por ID:', dados);
        this.tarefaDetalhes = dados;
      },
      error: (err) => {
        console.error('Erro na requisição GET por ID:', err);
        alert('Tarefa não encontrada com o ID informado!');
      }
    });
  }

  limparBuscaId(): void {
    this.tarefaDetalhes = undefined;
    this.buscaId = '';
  }

  cadastrarTarefa(): void {
    if (!this.novaTarefa.titulo.trim()) return;

    this.tarefaService.criar(this.novaTarefa).subscribe({
      next: (res) => {
        console.log('Tarefa criada:', res);
        this.carregarTarefas();
        this.novaTarefa = { titulo: '', descricao: '', prioridade: 'baixa', status: 'ABERTA' };
      },
      error: (err) => console.error('Erro ao cadastrar:', err)
    });
  }

  excluirTarefa(id?: string): void {
    if (!id || !confirm('Deseja realmente excluir esta tarefa?')) return;

    this.tarefaService.deletar(id).subscribe({
      next: () => {
        console.log('Tarefa excluída');
        this.carregarTarefas();
      },
      error: (err) => console.error('Erro ao deletar:', err)
    });
  }
}