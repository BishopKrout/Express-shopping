// app.test.js
const request = require('supertest');
const app = require('./app');
const fakeDb = require('./fakeDb');

beforeEach(() => {
    fakeDb.create({name: 'testItem', price: 3.00});
});

afterEach(() => {
    fakeDb.reset();
});

test('GET /items', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([{name: 'testItem', price: 3.00}]);
});

test('POST /items', async () => {
    const res = await request(app)
        .post('/items')
        .send({name: 'newItem', price: 1.00});
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({added: {name: 'newItem', price: 1.00}});
});

test('GET /items/:name', async () => {
    const res = await request(app).get('/items/testItem');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({name: 'testItem', price: 3.00});
});

test('PATCH /items/:name', async () => {
    const res = await request(app)
        .patch('/items/testItem')
        .send({name: 'updatedItem', price: 4.00});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({updated: {name: 'updatedItem', price: 4.00}});
});

test('DELETE /items/:name', async () => {
    const res = await request(app).delete('/items/testItem');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({message: 'Deleted'});
});
