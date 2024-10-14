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
            body: JSON.stringify({ "task": task })
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
            body: JSON.stringify({ "task": task })
        });
        const updatedTodo = await response.json();

        if (response.status >= 200 && response.status <= 299) {
            console.log(`Todo has been updated successfully, the task is now: ${JSON.stringify(updatedTodo)}`);
        } else {
            throw new Error("Something went wrong." + updatedTodo.message);
        }
    }
    catch (err) {
        console.log(err.message);
    }
}

const fetchDelete = async (id) => {
    try {
        const url = baseUrl + id;
        const response = await fetch(url, {
            method: 'DELETE'
        });
        const content = await response.json();
        
        if (!response.ok) {
            throw new Error(`Something went wrong. ${content.message}`);
        } else {
            console.log(content.message);
        }
    }
    catch (err) {
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

function getNewTaskFromUser() {
    let task = prompt("If you would like to save a new task enter a short description: ");
    fetchPost(task);
}

function getUpdatesFromUser() {
    console.log("You can update a task.")
    let id;
    while (isNaN(parseInt(id))) {
        id = prompt("Enter an id: ");
    }
    let newDescription = prompt("Type the new description: ");
    fetchPut(id, newDescription);
}

function getNeedlesTaskIdFromUser() {
    console.log("You can delete a task.");
    let id;
    while (isNaN(parseInt(id))) {
        id = prompt("Enter the id of needless task: ");
    }

    let answer = "";
    while(answer.toUpperCase() !== 'N' && answer.toUpperCase() !== 'Y') {
        answer = prompt("Are you sure about deleting the task? (Y / N)");
    }
    
    if(answer.toUpperCase() === 'N'){
        return;
    } else {
        fetchDelete(id);
    }
    
}

//fetchAll();
//fetchById(3);
//getIdFromUser();
//getNewTaskFromUser();
//getUpdatesFromUser();
getNeedlesTaskIdFromUser();