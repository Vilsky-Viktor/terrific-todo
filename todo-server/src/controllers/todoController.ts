import { Request, Response } from 'express';
import { TodoService } from '../services/todoService';

export class TodoController {
    private todoService: TodoService;

    constructor() {
        this.todoService = new TodoService();
    }

    public createTodo = async (req: Request, res: Response): Promise<void> => {
        try {
            const todo = await this.todoService.createTodo(req.body);
            res.status(201).json(todo);
        } catch (error) {
            throw error;
        }
    }

    public getTodoById = async (req: Request, res: Response): Promise<void> => {
        try {
            const todo = await this.todoService.getTodoById(req.params.id);
            if (todo) {
                res.status(200).json(todo);
            } else {
                res.status(404).json({ message: 'Todo not found' });
            }
        } catch (error) {
            throw error;
        }
    }

    public getAllTodos = async (req: Request, res: Response): Promise<void> => {
        try {
            const todos = await this.todoService.getAllTodos();
            res.status(200).json(todos);
        } catch (error) {
            throw error;
        }
    }

    public updateTodo = async (req: Request, res: Response): Promise<void> => {
        try {
            const todo = await this.todoService.updateTodo(req.params.id, req.body);
            if (todo) {
                res.status(200).json(todo);
            } else {
                res.status(404).json({ message: 'Todo not found' });
            }
        } catch (error) {
            throw error;
        }
    }

    public deleteTodo = async (req: Request, res: Response): Promise<void> => {
        try {
            const todo = await this.todoService.deleteTodo(req.params.id);
            if (todo) {
                res.status(200).json({ message: 'Todo deleted successfully' });
            } else {
                res.status(404).json({ message: 'Todo not found' });
            }
        } catch (error) {
            throw error;
        }
    }
}