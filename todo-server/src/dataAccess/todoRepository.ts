import Todo, { ITodo } from '../models/todo';

export class TodoRepository {
    public async create(todo: ITodo): Promise<ITodo> {
        return await Todo.create(todo);
    }

    public async findById(id: string): Promise<ITodo | null> {
        return await Todo.findById(id).exec();
    }

    public async findAll(): Promise<ITodo[]> {
        return await Todo.find().exec();
    }

    public async update(id: string, todo: Partial<ITodo>): Promise<ITodo | null> {
        return await Todo.findByIdAndUpdate(id, todo, { new: true }).exec();
    }

    public async delete(id: string): Promise<ITodo | null> {
        return await Todo.findByIdAndDelete(id).exec();
    }
}