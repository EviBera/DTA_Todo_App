import fs from 'fs';
import express from 'express';

const port = 4000;
const app = express();

const counter = () => {
    const todos = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    const maxId = todos.reduce((acc, curr) => {
        if(curr.id > acc.id){
            return curr;
        } else {
            return acc;
        }
    }).id;

    console.log(maxId);
    return maxId;
}

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

app.post('/', (req, res) => {
    let nextId = counter() + 1;
    const newTodo = { 
        id: nextId,
        ...req.body,
        isComplete: false
    };
    const todos = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    const extendedTodos = [...todos, newTodo];
    try {
        fs.writeFileSync('./data.json', JSON.stringify(extendedTodos, null, 2));
        res.status(201).json(newTodo);
    }
    catch(err){
        console.error(err);
    }
});

app.listen(port, () => {
    console.log("Server listens on port: " + port);
});