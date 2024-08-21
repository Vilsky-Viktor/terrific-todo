import { createTodoValidator, updateTodoValidator } from '../../../src/validators/todoValidator';
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';


const validateRequest = async (validators, req, res, next) => {
    await Promise.all(validators.map(validator => validator(req, res, next)));
    next();
};

describe('Validators', () => {
    describe('createTodoValidator', () => {
        it('should validate that title is required', async () => {
            const req = { body: {} } as Request;
            const res = {} as Response;
            const next = jest.fn();

            await validateRequest(createTodoValidator, req, res, next);
            expect(validationResult(req).array()).toEqual([
                {
                    type: 'field',
                    value: undefined,
                    msg: 'Title is required',
                    path: 'title',
                    location: 'body',
                },
            ]);
        });

        it('should validate description as optional string', async () => {
            const req = { body: { title: 'Test Todo', description: 123 } } as Request;
            const res = {} as Response;
            const next = jest.fn();

            await validateRequest(createTodoValidator, req, res, next);
            expect(validationResult(req).array()).toEqual([
                {
                    msg: 'Invalid value',
                    path: 'description',
                    location: 'body',
                    type: 'field',
                    value: 123,
                },
            ]);
        });

        it('should validate done as optional boolean', async () => {
            const req = { body: { title: 'Test Todo', done: 'wrong' } } as Request;
            const res = {} as Response;
            const next = jest.fn();

            await validateRequest(createTodoValidator, req, res, next);
            expect(validationResult(req).array()).toEqual([
                {
                    msg: 'Invalid value',
                    path: 'done',
                    location: 'body',
                    type: 'field',
                    value: 'wrong',
                },
            ]);
        });

        it('should pass validation with valid input', async () => {
            const req = { body: { title: 'Test Todo', description: 'Test description', done: true } } as Request;
            const res = {} as Response;
            const next = jest.fn();

            await validateRequest(createTodoValidator, req, res, next);
            expect(validationResult(req).array()).toEqual([]);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('updateTodoValidator', () => {
        it('should validate that ID is a valid Mongo ID', async () => {
            const req = { params: { id: 'invalidId' } } as unknown as Request;
            const res = {} as Response;
            const next = jest.fn();

            await validateRequest(updateTodoValidator, req, res, next);
            expect(validationResult(req).array()).toEqual([
                {
                    msg: 'Invalid ID',
                    path: 'id',
                    location: 'params',
                    type: 'field',
                    value: 'invalidId',
                },
            ]);
        });

        it('should pass validation with valid ID', async () => {
            const req = {
                params: {
                    id: '507f1f77bcf86cd799439011',
                },
                body: {
                    title: 'Updated Todo',
                },
            } as unknown as Request;
            const res = {} as Response;
            const next = jest.fn();

            await validateRequest(updateTodoValidator, req, res, next);
            expect(validationResult(req).array()).toEqual([]);
            expect(next).toHaveBeenCalled();
        });

        it('should validate optional fields correctly', async () => {
            const req = {
                params: {
                    id: '507f1f77bcf86cd799439011',
                },
                body: {
                    title: 123,
                    done: 'yes',
                },
            } as unknown as Request;
            const res = {} as Response;
            const next = jest.fn();

            await validateRequest(updateTodoValidator, req, res, next);
            expect(validationResult(req).array()).toEqual([
                {
                    msg: 'Invalid value',
                    path: 'done',
                    location: 'body',
                    type: 'field',
                    value: 'yes',
                },
                {
                    msg: 'Invalid value',
                    path: 'title',
                    location: 'body',
                    type: 'field',
                    value: 123,
                },
            ]);
        });
    });
});
