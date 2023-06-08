// app.js
const express = require('express');
const app = express();
app.use(express.json());

const db = process.env.NODE_ENV === 'test' ? require('./fakeDb') : require('./realDb');

app.get('/items', (req, res) => {
    res.json(db.getAll());
});

app.post('/items', (req, res) => {
    const newItem = db.create(req.body);
    res.status(201).json({ added: newItem });
});

app.get('/items/:name', (req, res) => {
    const itemName = req.params.name;
    const item = db.get(itemName);
    if (!item) {
        return res.status(404).send('Item not found');
    }
    res.json(item);
});

app.patch('/items/:name', (req, res) => {
    const itemName = req.params.name;
    const item = db.update(itemName, req.body);
    if (!item) {
        return res.status(404).send('Item not found');
    }
    res.json({ updated: item });
});

app.delete('/items/:name', (req, res) => {
    const itemName = req.params.name;
    const item = db.remove(itemName);
    if (!item) {
        return res.status(404).send('Item not found');
    }
    res.json({ message: 'Deleted' });
});

module.exports = app;
