const request = require("supertest");
const mongoose = require('mongoose');
const app = require('../app');
const constants = require('../constant');
const Person = require('../PersonModel');

const TEST_MONGODB_URI = 'mongodb://localhost:27017/test_db';

beforeAll(async () => {
    await mongoose.connect(TEST_MONGODB_URI);
}, 10000);

afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
}, 10000);

beforeEach(async () => {
    if (mongoose.connection.readyState !== 0) {
        await Person.deleteMany({});
    }
});

describe('API Integration Tests', () => {
    const samplePerson = {
        name: 'John Doe',
        age: 30,
        email: 'john@example.com',
        type: 'user'
    };

    describe('GET /api/v1/users', () => {
        it('should return empty array when no users exist', async () => {
            const response = await request(app).get('/api/v1/users');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe(constants.MESSAGES.FETCHED);
            expect(response.body.data).toEqual([]);
        }, 10000);

        it('should return array of users when users exist', async () => {
            await Person.create(samplePerson);
            const response = await request(app).get('/api/v1/users');
            expect(response.status).toBe(200);
            expect(response.body.data.length).toBe(1);
            expect(response.body.data[0].name).toBe(samplePerson.name);
        }, 10000);
    });

    describe('POST /api/v1/users', () => {
        it('should create a new user', async () => {
            const response = await request(app)
                .post('/api/v1/users')
                .send(samplePerson);
            
            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe(constants.MESSAGES.CREATED);
            expect(response.body.data.name).toBe(samplePerson.name);
        }, 10000);
    });

    describe('GET /api/v1/users/:id', () => {
        it('should return user by id', async () => {
            const person = await Person.create(samplePerson);
            const response = await request(app).get(`/api/v1/users/${person._id}`);
            
            expect(response.status).toBe(200);
            expect(response.body.data.name).toBe(samplePerson.name);
        }, 10000);

        it('should return 404 for non-existent user', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const response = await request(app).get(`/api/v1/users/${fakeId}`);
            
            expect(response.status).toBe(404);
        }, 10000);
    });

    describe('PUT /api/v1/users/:id', () => {
        it('should update user by id', async () => {
            const person = await Person.create(samplePerson);
            const update = { name: 'Jane Doe' };
            
            const response = await request(app)
                .put(`/api/v1/users/${person._id}`)
                .send(update);
            
            expect(response.status).toBe(200);
            expect(response.body.data.name).toBe(update.name);
        }, 10000);
    });

    describe('DELETE /api/v1/users/:id', () => {
        it('should delete user by id', async () => {
            const person = await Person.create(samplePerson);
            const response = await request(app).delete(`/api/v1/users/${person._id}`);
            
            expect(response.status).toBe(200);
            expect(response.body.message).toBe(constants.MESSAGES.DELETED);
            
            const found = await Person.findById(person._id);
            expect(found).toBeNull();
        }, 10000);
    });
});