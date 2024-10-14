import promptSync from 'prompt-sync';

const prompt = promptSync();
const baseUrl = 'http://localhost:4000/';

const fetchAll = async () => {
    try {
        const response = await fetch();
        const todos = await response.json(baseUrl);
        console.log(todos);
    }
    catch (err) {
        console.error(err.message);
    }
}

const fetchById = async (id) => {
    try {
        const url = baseUrl + id;
        const response = await fetch(url);
        const todo = await response.json();
        console.log(todo);
    }
    catch (err) {
        console.error(err.message);
    }
}

const fetchPost = async (task) => {
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"task" : task})
        });
        const newTodo = await response.json();
        console.log(`New todo: ${JSON.stringify(newTodo)} has been created successfully`);
    } catch (err) {
        console.log(err);
    }
}

const fetchPut = async (id, task) => {
    try {
        const url = baseUrl + id;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"task" : task})
        });
        const updatedTodo = await response.json();

        if(response.status >= 200 && response.status <= 299){
            console.log(`Todo has been updated successfully, the task is now: ${JSON.stringify(updatedTodo)}`);
        } else {
            throw new Error("Something went wrong." + updatedTodo.message);
        }
    }
    catch(err) {
        console.log(err.message);
    }
}

function getIdFromUser() {
    let id;
    while (isNaN(parseInt(id))) {
        id = prompt("Enter an id: ");
    }
    fetchById(id);
}

function getTaskFromUser() {
    let task = prompt("If you would like to save a new task enter a short description: ");
    fetchPost(task);
}

function getUpdatesFromUser(){
    console.log("You can update a task.")
    let id;
    while (isNaN(parseInt(id))) {
        id = prompt("Enter an id: ");
    }
    let newDescription = prompt("Type the new description: ");
    fetchPut(id, newDescription);
}

//fetchAll();
//fetchById(3);
//getIdFromUser();
//getTaskFromUser();
getUpdatesFromUser();