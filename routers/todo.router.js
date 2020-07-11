const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET

router.get('/', (req, res) => {
    console.log(`In GET route!`);

    const query = `SELECT * FROM tasks;`;

    pool
        .query(query)
        .then((dbRes) => {
            console.log(`In dbRes`);
            res.send(dbRes.rows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

// POST

router.post('/', (req, res) => {
    const query = `INSERT INTO tasks (title, description)
                    VALUES ($1, $2);`;

    pool
        .query(query, [req.body.title, req.body.description])
        .then((dbRes) => {
            console.log(dbRes);
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

// PUT

router.put('/:id', (req, res) => {
    console.log('In PUT route');
    const query = `UPDATE tasks SET completed = $1 WHERE id = $2;`;
    const id = req.params.id;

    // req.body will be passed a boolean

    pool
        .query(query, [req.body.status, id])
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error!', err);
            res.sendStatus(500);
        });
});

// DELETE

module.exports = router;