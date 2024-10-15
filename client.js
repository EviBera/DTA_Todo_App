import promptSync from 'prompt-sync';

const prompt = promptSync();
const baseUrl = 'http://localhost:4000';

async function runConsoleApp() {
    console.log("This is the Todo Console App, welcome!");

    let shouldStartAgain = true;
    
    while(shouldStartAgain){
        displayOptions()
        let answer = getSelectionFromUser()
        console.log("*** " + answer + " ***");
    
        const exit = await handleOptions(answer);
        if (exit === 'Q'){
            shouldStartAgain = false;
            break;
        }
    
        let choice = checkIfUserWantsToContinue();
        if (choice === 'Q') {
            shouldStartAgain = false;
        }
    }
}

function displayOptions() {
    console.log("You can select an option with typing the letter in brackets: ");
    console.log(" * List all tasks (L) ");
    console.log(" * Check a task by its ID (C) ");
    console.log(" * Add a new task (A) ");
    console.log(" * Update a task (U) ");
    console.log(" * Delete a task (D) ");
    console.log(" * Quit the app (Q)");    
}

async function handleOptions(answer) {
    switch (answer) {
        case 'L':
            console.log("Your tasks in the database: ");
            await fetchAll();
            break;
        case 'C':
            await getIdFromUser();
            break;
        case 'A':
            await getNewTaskFromUser();
            break;
        case 'U':
            await getUpdatesFromUser();
            break;
        case 'D':
            await getNeedlesTaskIdFromUser();
            break;
        case 'Q':
            return 'Q';
        default:
            return;
    }
}

function getSelectionFromUser() {
    const options = ['L', 'C', 'A', 'U', 'D', 'Q']
    let answer = "";
    while (!options.includes(answer.toUpperCase())) {
        answer = prompt("Please, enter the first letter of your selection: ");
    }

    return answer.toUpperCase();
}

function checkIfUserWantsToContinue() {
    let choice = "";
    while (choice.toUpperCase() !== 'G' && choice.toUpperCase() !== 'Q') {
        choice = prompt("Would you like to go on (G) or quit (Q)? ");
    }

    return choice.toUpperCase();
}

const fetchAll = async () => {
    try {
        const response = await fetch(baseUrl);
        const todos = await response.json();
        console.log(todos);
    }
    catch (err) {
        console.error(err.message);
    }
}

const fetchById = async (id) => {
    try {
        const url = baseUrl + "/" + id;
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
        const url = baseUrl + "/" + id;
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
        const url = baseUrl + "/" +id;
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

async function getIdFromUser() {
    let id;
    while (isNaN(parseInt(id))) {
        id = prompt("Enter an id: ");
    }
    await fetchById(id);
}

async function getNewTaskFromUser() {
    let task = prompt("If you would like to save a new task enter a short description: ");
    await fetchPost(task);
}

async function getUpdatesFromUser() {
    console.log("You can update a task by its id.")
    let id;
    while (isNaN(parseInt(id))) {
        id = prompt("Enter the id: ");
    }
    let newDescription = prompt("Type the new description: ");
    await fetchPut(id, newDescription);
}

async function getNeedlesTaskIdFromUser() {
    console.log("You can delete a task by its id.");
    let id;
    while (isNaN(parseInt(id))) {
        id = prompt("Enter the id of the needless task: ");
    }

    let answer = "";
    while (answer.toUpperCase() !== 'N' && answer.toUpperCase() !== 'Y') {
        answer = prompt("Are you sure about deleting the task? (Y / N)");
    }

    if (answer.toUpperCase() === 'N') {
        return;
    } else {
        await fetchDelete(id);
    }

}


runConsoleApp();
