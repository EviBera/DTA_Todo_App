import promptSync from 'prompt-sync';

const prompt = promptSync();

const fetchAll = async () => {
    try {
        const response = await fetch('http://localhost:4000');
        const todos = await response.json();
        console.log(todos);
    }
    catch (err) {
        console.error(err.message);
    }
}

const fetchById = async (id) => {
    try {
        const url = 'http://localhost:4000/' + id;
        const response = await fetch(url);
        const todo = await response.json();
        console.log(todo);
    }
    catch (err) {
        console.error(err.message);
    }
}

function getIdFromUser () {
    let id = prompt("Enter an id: ");
    fetchById(id);
}

//fetchAll();
//fetchById(3);
getIdFromUser();