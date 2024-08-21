import { MongoClient, ObjectId } from 'mongodb';
import axios from 'axios';

const serviceUrl = process.env.SERVICE_URL;
const mongoUri = process.env.MONGO_URI;

let client: MongoClient;
let db: any;

beforeAll(async () => {
    client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db();
});

afterAll(async () => {
    await client.close();
});

afterEach(async () => {
    await db.collection('todos').deleteMany({});
});

describe('TODO Routes Integration Tests', () => {

    it('should create a new todo item', async () => {
        const response = await axios.post(
            `${serviceUrl}/api/todos`,
            { title: 'Test TODO' },
        );

        expect(response.status).toBe(201);
        expect(response.data.title).toBe('Test TODO');
        expect(response.data.description).toBe('');
        expect(response.data.done).toBe(false);

        const todo = await db.collection('todos').findOne({
            _id: new ObjectId(response.data._id),
        });

        expect(todo).not.toBeNull();
        expect(todo.title).toBe('Test TODO');
        expect(todo.description).toBe('');
        expect(todo.done).toBe(false);
    });

    it('should retrieve a todo item by id', async () => {
        const { insertedId } = await db.collection('todos').insertOne({
            title: 'Test TODO',
            description: 'test description',
            done: false,
        });

        const response = await axios.get(`${serviceUrl}/api/todos/${insertedId}`);

        expect(response.status).toBe(200);
        expect(response.data.title).toBe('Test TODO');
        expect(response.data.description).toBe('test description');
        expect(response.data.done).toBe(false);
    });

    it('should update a todo item', async () => {
        const { insertedId } = await db.collection('todos').insertOne({
            title: 'Test TODO',
            description: 'test desc',
            done: false,
        });

        const response = await axios.put(
            `${serviceUrl}/api/todos/${insertedId}`,
            {
                title: 'Updated TODO',
                done: true,
            });

        expect(response.status).toBe(200);
        expect(response.data.title).toBe('Updated TODO');
        expect(response.data.description).toBe('test desc');
        expect(response.data.done).toBe(true);

        const todo = await db.collection('todos').findOne({
            _id: new ObjectId(insertedId),
        });

        expect(todo).not.toBeNull();
        expect(todo.title).toBe('Updated TODO');
        expect(todo.description).toBe('test desc');
        expect(todo.done).toBe(true);
    });

    it('should delete a todo item', async () => {
        const { insertedId } = await db.collection('todos').insertOne({
            title: 'Test TODO',
            done: false,
        });

        await axios.delete(`${serviceUrl}/api/todos/${insertedId}`);

        try {
            await axios.get(`${serviceUrl}/api/todos/${insertedId}`);
        } catch (error: any) {
            expect(error.response.status).toBe(404);
        }

        const todo = await db.collection('todos').findOne({
            _id: new ObjectId(insertedId),
        });

        expect(todo).toBeNull();
    });

    it('should return 404 for a non-existing todo', async () => {
        const nonExistingId = new ObjectId();

        try {
            await axios.get(`${serviceUrl}/api/todos/${nonExistingId}`);
        } catch (error: any) {
            expect(error.response.status).toBe(404);
        }
    });
});
