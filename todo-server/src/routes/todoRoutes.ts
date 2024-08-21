import express from 'express';
import { TodoController } from '../controllers/todoController';
import { createTodoValidator, updateTodoValidator } from '../validators/todoValidator';

const router = express.Router();
const todoController = new TodoController();

router.post('/', createTodoValidator, todoController.createTodo);
router.get('/:id', todoController.getTodoById);
router.get('/', todoController.getAllTodos);
router.put('/:id', updateTodoValidator, todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

export default router;