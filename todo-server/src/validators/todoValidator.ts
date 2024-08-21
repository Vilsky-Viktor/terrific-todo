import { body, param } from 'express-validator';

export const createTodoValidator = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional().isString(),
    body('done').optional().isBoolean(),
];

export const updateTodoValidator = [
    param('id').isMongoId().withMessage('Invalid ID'),
    body('title').optional().isString(),
    body('description').optional().isString(),
    body('done').optional().isBoolean(),
];