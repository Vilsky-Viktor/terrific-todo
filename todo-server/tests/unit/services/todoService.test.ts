import { TodoService } from '../../../src/services/todoService';
import { TodoRepository } from '../../../src/dataAccess/todoRepository';
import Todo, { ITodo } from '../../../src/models/todo';

jest.mock('../../../src/dataAccess/todoRepository');

describe('TodoService', () => {
    let todoService: TodoService;
    let todoRepository: jest.Mocked<TodoRepository>;

    beforeEach(() => {
        todoRepository = new TodoRepository() as jest.Mocked<TodoRepository>;
        todoService = new TodoService();
        (todoService as any).todoRepository = todoRepository;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a todo', async () => {
        const todo: ITodo = new Todo({ title: 'Test Todo', description: 'Test desc' });
        todoRepository.create.mockResolvedValue(todo);

        const result = await todoService.createTodo(todo);

        expect(todoRepository.create).toHaveBeenCalledWith(todo);
        expect(result).toEqual(todo);
    });

    it('should get a todo by id', async () => {
        const todo: ITodo = new Todo({ id: '1', title: 'Test Todo', description: 'Test' });
        todoRepository.findById.mockResolvedValue(todo);

        const result = await todoService.getTodoById('1');

        expect(todoRepository.findById).toHaveBeenCalledWith('1');
        expect(result).toEqual(todo);
    });

    it('should return null if todo not found by id', async () => {
        todoRepository.findById.mockResolvedValue(null);

        const result = await todoService.getTodoById('1');

        expect(todoRepository.findById).toHaveBeenCalledWith('1');
        expect(result).toBeNull();
    });

    it('should get all todos', async () => {
        const todos: ITodo[] = [
            new Todo({ id: '1', title: 'Test Todo 1', done: false }),
            new Todo({ id: '2', title: 'Test Todo 2', done: true }),
        ];
        todoRepository.findAll.mockResolvedValue(todos);

        const result = await todoService.getAllTodos();

        expect(todoRepository.findAll).toHaveBeenCalled();
        expect(result).toEqual(todos);
    });

    it('should update a todo', async () => {
        const updatedTodo: ITodo = new Todo({ id: '1', title: 'New Todo', done: false });
        todoRepository.update.mockResolvedValue(updatedTodo);

        const result = await todoService.updateTodo('1', { title: 'Updated Todo', done: true });

        expect(todoRepository.update).toHaveBeenCalledWith('1', { title: 'Updated Todo', done: true });
        expect(result).toEqual(updatedTodo);
    });

    it('should return null if todo not found when updating', async () => {
        todoRepository.update.mockResolvedValue(null);

        const result = await todoService.updateTodo('1', { title: 'Updated Todo', done: true });

        expect(todoRepository.update).toHaveBeenCalledWith('1', { title: 'Updated Todo', done: true });
        expect(result).toBeNull();
    });

    it('should delete a todo', async () => {
        const deletedTodo: ITodo = new Todo({ id: '1', title: 'Test Todo' });
        todoRepository.delete.mockResolvedValue(deletedTodo);

        const result = await todoService.deleteTodo('1');

        expect(todoRepository.delete).toHaveBeenCalledWith('1');
        expect(result).toEqual(deletedTodo);
    });

    it('should return null if todo not found when deleting', async () => {
        todoRepository.delete.mockResolvedValue(null);

        const result = await todoService.deleteTodo('1');

        expect(todoRepository.delete).toHaveBeenCalledWith('1');
        expect(result).toBeNull();
    });
});
