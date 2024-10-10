import fs from 'fs';
import express from 'express';

const port = 4000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    const todos = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    res.json(todos);
});

app.listen(port, () => {
    console.log("Server listens on port: " + port);
});