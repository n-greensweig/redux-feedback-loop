const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET request to get user data
router.get('/', (req, res) => {

    let queryText = `SELECT * FROM "feedback" ORDER BY "id" DESC;`;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.error('Error getting results from DB', error);
            res.sendStatus(400);
        });

})

// POST request handling user submission
router.post('/', (req, res) => {

    let queryText = `INSERT INTO "feedback" ("name", "feeling", "understanding", "support", "comments")
    VALUES ($1, $2, $3, $4, $5);`;

    pool.query(queryText, [
        req.body.name,
        req.body.feeling,
        req.body.understanding,
        req.body.support,
        req.body.comments])
        .then(result => {
            res.sendStatus(200);
            console.log('POST successful.');
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });

});

// DELETE request deleting data from the admin table
router.delete('/:id', (req, res) => {

    let queryText = `DELETE FROM "feedback" WHERE "id" = $1;`;

    pool.query(queryText, [req.params.id])
        .then(result => {
            res.sendStatus(200);
            console.log('DELETE successful.');
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });

});

// PUT request updating data in the admin table
router.put('/:id', (req, res) => {

    let queryText = `UPDATE "feedback" SET "name" = $1 WHERE "id" = $2;`;

    pool.query(queryText, [req.body.name, req.params.id])
        .then(result => {
            res.sendStatus(200);
            console.log('DELETE successful.');
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });

});

module.exports = router;