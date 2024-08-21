import { TodoRepository } from '../dataAccess/todoRepository';
import { ITodo } from '../models/todo';
import logger from '../config/logger';

export class TodoService {
    private todoRepository: TodoRepository;

    constructor() {
        this.todoRepository = new TodoRepository();
    }

    public async createTodo(todo: ITodo): Promise<ITodo> {
        logger.info(`create task '${todo.title}'`);
        return this.todoRepository.create(todo);
    }

    public async getTodoById(id: string): Promise<ITodo | null> {
        logger.info(`get task '${id}'`);
        return this.todoRepository.findById(id);
    }

    public async getAllTodos(): Promise<ITodo[]> {
        logger.info(`get all tasks`);
        return this.todoRepository.findAll();
    }

    public async updateTodo(id: string, todo: Partial<ITodo>): Promise<ITodo | null> {
        logger.info(`update task '${id}'`);
        return this.todoRepository.update(id, todo);
    }

    public async deleteTodo(id: string): Promise<ITodo | null> {
        logger.info(`delete task task '${id}'`);
        return this.todoRepository.delete(id);
    }
}