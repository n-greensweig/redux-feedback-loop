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

    let queryText = `INSERT INTO "feedback" ("name", "feeling_text", "feeling", "understanding_text", "understanding", "support_text", "support", "comments")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;

    let feelingValue = (req.body.feeling === 'Very good' ? 5 :
        (req.body.feeling === 'Good' ? 4 :
            (req.body.feeling === 'Neutral' ? 3 :
                (req.body.feeling === 'Bad' ? 2 : 1))));

    let understandingValue = (req.body.understanding === 'Very well' ? 5 :
        (req.body.understanding === 'Well' ? 4 :
            (req.body.understanding === 'Neutral' ? 3 :
                (req.body.understanding === 'Poorly' ? 2 : 1))));

    let supportValue = (req.body.support === 'Very well' ? 5 :
        (req.body.support === 'Well' ? 4 :
            (req.body.support === 'Neutral' ? 3 :
                (req.body.support === 'Poorly' ? 2 : 1))));

    pool.query(queryText, [
        req.body.name,
        req.body.feeling,
        feelingValue,
        req.body.understanding,
        understandingValue,
        req.body.support,
        supportValue,
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
            console.log('PUT successful.');
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });

});

module.exports = router;