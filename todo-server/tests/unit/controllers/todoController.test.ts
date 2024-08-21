import { Request, Response } from 'express';
import { TodoController } from '../../../src/controllers/todoController';
import { TodoService } from '../../../src/services/todoService';
import { ITodo } from '../../../src/models/todo';

jest.mock('../../../src/services/todoService');

describe('TodoController', () => {
    let todoController: TodoController;
    let mockTodoService: jest.Mocked<TodoService>;

    beforeEach(() => {
        mockTodoService = new TodoService() as jest.Mocked<TodoService>;
        todoController = new TodoController();
        (todoController as any).todoService = mockTodoService;
    });

    describe('createTodo', () => {
        it('should create a todo and return it', async () => {
            const req = { body: { title: 'Test Todo' } } as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            const createdTodo = { id: '1', title: 'Test Todo' } as ITodo;
            mockTodoService.createTodo.mockResolvedValue(createdTodo);

            await todoController.createTodo(req, res);

            expect(mockTodoService.createTodo).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(createdTodo);
        });

        it('should handle errors', async () => {
            const req = { body: { title: 'Test Todo' } } as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            mockTodoService.createTodo.mockRejectedValue(new Error('Error creating todo'));

            await expect(todoController.createTodo(req, res)).rejects.toThrow('Error creating todo');
        });
    });

    describe('getTodoById', () => {
        it('should return the todo if found', async () => {
            const req = { params: { id: '1' } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            const todo = { id: '1', title: 'Test Todo' } as ITodo;
            mockTodoService.getTodoById.mockResolvedValue(todo);

            await todoController.getTodoById(req, res);

            expect(mockTodoService.getTodoById).toHaveBeenCalledWith(req.params.id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(todo);
        });

        it('should return 404 if todo not found', async () => {
            const req = { params: { id: '1' } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            mockTodoService.getTodoById.mockResolvedValue(null);

            await todoController.getTodoById(req, res);

            expect(mockTodoService.getTodoById).toHaveBeenCalledWith(req.params.id);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Todo not found' });
        });
    });

    describe('getAllTodos', () => {
        it('should return all todos', async () => {
            const req = {} as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            const todos = [{ id: '1', title: 'Test Todo' } as ITodo];
            mockTodoService.getAllTodos.mockResolvedValue(todos);

            await todoController.getAllTodos(req, res);

            expect(mockTodoService.getAllTodos).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(todos);
        });

        it('should handle errors', async () => {
            const req = {} as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            mockTodoService.getAllTodos.mockRejectedValue(new Error('Error fetching todos'));

            await expect(todoController.getAllTodos(req, res)).rejects.toThrow('Error fetching todos');
        });
    });

    describe('updateTodo', () => {
        it('should update and return the todo if found', async () => {
            const req = { params: { id: '1' }, body: { title: 'Updated Todo' } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            const updatedTodo = { id: '1', title: 'Updated Todo' } as ITodo;
            mockTodoService.updateTodo.mockResolvedValue(updatedTodo);

            await todoController.updateTodo(req, res);

            expect(mockTodoService.updateTodo).toHaveBeenCalledWith(req.params.id, req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedTodo);
        });

        it('should return 404 if todo not found', async () => {
            const req = { params: { id: '1' }, body: { title: 'Updated Todo' } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            mockTodoService.updateTodo.mockResolvedValue(null);

            await todoController.updateTodo(req, res);

            expect(mockTodoService.updateTodo).toHaveBeenCalledWith(req.params.id, req.body);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Todo not found' });
        });
    });

    describe('deleteTodo', () => {
        it('should delete the todo if found', async () => {
            const req = { params: { id: '1' } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            const deletedTodo = { id: '1', title: 'Test' } as ITodo;
            mockTodoService.deleteTodo.mockResolvedValue(deletedTodo);

            await todoController.deleteTodo(req, res);

            expect(mockTodoService.deleteTodo).toHaveBeenCalledWith(req.params.id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Todo deleted successfully' });
        });

        it('should return 404 if todo not found', async () => {
            const req = { params: { id: '1' } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            mockTodoService.deleteTodo.mockResolvedValue(null);

            await todoController.deleteTodo(req, res);

            expect(mockTodoService.deleteTodo).toHaveBeenCalledWith(req.params.id);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Todo not found' });
        });
    });
});
