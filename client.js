import promptSync from 'prompt-sync';

const prompt = promptSync();
const baseUrl = 'http://localhost:4000';

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


//fetchAll();
//fetchById(3);
//getIdFromUser();
getTaskFromUser();