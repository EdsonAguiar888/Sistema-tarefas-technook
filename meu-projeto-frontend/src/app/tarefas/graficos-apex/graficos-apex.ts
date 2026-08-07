import { Component, ElementRef, AfterViewInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import ApexCharts from 'apexcharts'; // 1. Importa a biblioteca ApexCharts pura
import { TarefaService, Tarefa } from '../tarefa.service'; // 2. Ajuste o caminho do seu service
import type { ApexOptions } from 'apexcharts'; // 3. Importa o tipo ApexOptions

@Component({
  selector: 'app-graficos-apex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graficos-apex.html',
  styleUrl: './graficos-apex.css'
})
export class GraficosApexComponent implements AfterViewInit {

  // 3. Captura as divs do HTML onde os gráficos serão renderizados
  @ViewChild('chartStatus') chartStatusRef!: ElementRef;
  @ViewChild('chartPrioridade') chartPrioridadeRef!: ElementRef;

  private tarefaService = inject(TarefaService);

  // Instâncias dos gráficos para podermos renderizar/destruir
  private chartStatusInstance?: ApexCharts;
  private chartPrioridadeInstance?: ApexCharts;

  // 4. Ciclo de vida do Angular: Executa logo após a tela e as divs estarem prontas no DOM
  ngAfterViewInit(): void {
    this.carregarDadosEConfigurarGraficos();
  }

  carregarDadosEConfigurarGraficos(): void {
    this.tarefaService.listar().subscribe({
      next: (tarefas: Tarefa[]) => {
        // Contagem de tarefas por Status
        const qtdAberta = tarefas.filter(t => t.status === 'ABERTA').length;
        const qtdEmAndamento = tarefas.filter(t => t.status === 'EM_ANDAMENTO').length;
        const qtdConcluida = tarefas.filter(t => t.status === 'CONCLUIDA').length;

        // Contagem de tarefas por Prioridade
        const qtdBaixa = tarefas.filter(t => t.prioridade === 'baixa').length;
        const qtdMedia = tarefas.filter(t => t.prioridade === 'media').length;
        const qtdAlta = tarefas.filter(t => t.prioridade === 'alta').length;

        // Renderiza os gráficos nas divs capturadas
        this.renderizarGraficoStatus(qtdAberta, qtdEmAndamento, qtdConcluida);
        this.renderizarGraficoPrioridade(qtdBaixa, qtdMedia, qtdAlta);
      },
      error: (err) => console.error('Erro ao carregar dados para os gráficos:', err)
    });
  }

  // 5. Gráfico 1: Donut (Status)
  private renderizarGraficoStatus(aberta: number, emAndamento: number, concluida: number): void {
    const options: ApexOptions = {
      series: [aberta, emAndamento, concluida],
      labels: ['Aberta', 'Em Andamento', 'Concluída'],
      chart: {
        type: 'donut',
        height: 320
      },
      colors: ['#e74c3c', '#f39c12', '#2ecc71'],
      title: {
        text: 'Tarefas por Status',
        align: 'left'
      },
      legend: {
        position: 'bottom'
      }
    };

    // Cria a instância do ApexCharts apontando para a div nativa
    this.chartStatusInstance = new ApexCharts(this.chartStatusRef.nativeElement, options);
    this.chartStatusInstance.render();
  }

  // 6. Gráfico 2: Barras (Prioridade)
  private renderizarGraficoPrioridade(baixa: number, media: number, alta: number): void {
    const options: ApexOptions = {
      series: [{
        name: 'Quantidade',
        data: [baixa, media, alta]
      }],
      chart: {
        type: 'bar',
        height: 320
      },
      xaxis: {
        categories: ['Baixa', 'Média', 'Alta']
      },
      colors: ['#3498db'],
      title: {
        text: 'Tarefas por Prioridade',
        align: 'left'
      }
    };

    this.chartPrioridadeInstance = new ApexCharts(this.chartPrioridadeRef.nativeElement, options);
    this.chartPrioridadeInstance.render();
  }
}