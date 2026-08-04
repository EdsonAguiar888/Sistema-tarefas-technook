
// src/app/tarefas/tarefa-lista/tarefa-lista.ts

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