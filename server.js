import fs from 'fs';
import express from 'express';

const port = 4000;
const app = express();


app.use(express.json());

app.get('/', (req, res) => {
    const todos = getTodosList();
    res.json(todos);
});

app.get('/:id', (req, res) => {
    const { id } = req.params;
    const todos = getTodosList();
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
    const todos = getTodosList();
    const extendedTodos = [...todos, newTodo];
    try {
        fs.writeFileSync('./data.json', JSON.stringify(extendedTodos, null, 2));
        res.status(201).json(newTodo);
    }
    catch(err){
        console.error(err);
    }
});

app.put('/:id', (req, res) => {
    try {
        const todos = getTodosList();
        const { id } = req.params;
        let updatableTaskIndex = todos.findIndex(t => t.id === parseInt(id));

        if(updatableTaskIndex === -1){
            res.status(404).json({message: "This task does not exist."});
        } else {
            todos[updatableTaskIndex] = { ...todos[updatableTaskIndex], ...req.body };
            fs.writeFileSync('./data.json', JSON.stringify(todos, null, 2));
            res.status(200).json(todos[updatableTaskIndex]);
        }
    }
    catch(err){
        console.log(err);
    }
})

function getTodosList() {
    return JSON.parse(fs.readFileSync('./data.json', 'utf8'));
}

const counter = () => {
    const todos = getTodosList();
    const maxId = todos.reduce((acc, curr) => {
        if(curr.id > acc.id){
            return curr;
        } else {
            return acc;
        }
    }).id;

    return maxId;
}

app.listen(port, () => {
    console.log("Server listens on port: " + port);
});