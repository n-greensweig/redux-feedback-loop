const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// POST request handling user submission
router.post('/', (req, res) => {

    let queryText = `INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
    VALUES ($1, $2, $3, $4);`;

    pool.query(queryText, [req.body.feeling,
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

module.exports = router;