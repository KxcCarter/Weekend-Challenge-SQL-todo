const express = require('express');
const bodyParser = require('body-parser');
const todoRouter = require('../routers/todo.router');
const pool = require('../modules/pool');

const app = express();

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('server/public'));

// ------
// ROUTES
// ------

app.use('/todo', todoRouter);

app.listen(PORT, () => {
    console.log('Server runing on port', PORT);
});