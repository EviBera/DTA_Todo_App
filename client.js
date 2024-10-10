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

fetchAll();