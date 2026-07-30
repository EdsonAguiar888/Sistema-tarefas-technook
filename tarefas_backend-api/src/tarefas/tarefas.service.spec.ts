import { Test, TestingModule } from '@nestjs/testing';
import { TarefasService } from './tarefas.service';

describe('TarefasService', () => {
  let service: TarefasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TarefasService],
    }).compile();

    service = module.get<TarefasService>(TarefasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task with the provided priority', () => {
    const tarefa = service.criar('Estudar', 'Resolver erro', 'alta');

    expect(tarefa.prioridade).toBe('alta');
    expect(service.listarTodas()).toContainEqual(
      expect.objectContaining({ id: tarefa.id, prioridade: 'alta' }),
    );
  });
});
