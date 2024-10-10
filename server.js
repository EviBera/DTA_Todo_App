import fs from 'fs';
import express from 'express';

const port = 4000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    const todos = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    res.json(todos);
});

app.get('/:id', (req, res) => {
    const { id } = req.params;
    const todos = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    const searchedTodo = todos.filter(t => t.id === parseInt(id))[0];
    res.json(searchedTodo);
})

app.listen(port, () => {
    console.log("Server listens on port: " + port);
});