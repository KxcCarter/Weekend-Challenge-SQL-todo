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

// DELETE

module.exports = router;