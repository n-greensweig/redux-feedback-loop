const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET request to get user data
router.get('/', (req, res) => {
  // SQL query to select all feedback data from the "feedback" table and order by ID in descending order
  let queryText = `SELECT * FROM "feedback" ORDER BY "id" DESC;`;
  
  pool.query(queryText)
    .then(result => {
      // Send the query result (feedback data) as the response
      res.send(result.rows);
    })
    .catch(error => {
      console.error('Error getting results from DB', error);
      // Send a 400 (Bad Request) status code if there is an error
      res.sendStatus(400);
    });
})

// POST request handling user submission
router.post('/', (req, res) => {
  // SQL query to insert user feedback data into the "feedback" table
  let queryText = `INSERT INTO "feedback" ("name", "feeling_text", "feeling", "understanding_text", "understanding", "support_text", "support", "comments")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;

  // Assign numeric values to feeling, understanding, and support based on user input
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

  // Execute the SQL query to insert feedback data into the database
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
      // Send a 200 (OK) status code if the POST request is successful
      res.sendStatus(200);
      console.log('POST successful.');
    })
    .catch(error => {
      console.error(error);
      // Send a 500 (Internal Server Error) status code if there is an error
      res.sendStatus(500);
    });
});

// DELETE request deleting data from the admin table
router.delete('/:id', (req, res) => {
  // SQL query to delete feedback data with a specific ID from the "feedback" table
  let queryText = `DELETE FROM "feedback" WHERE "id" = $1;`;

  // Execute the SQL query to delete feedback data
  pool.query(queryText, [req.params.id])
    .then(result => {
      // Send a 200 (OK) status code if the DELETE request is successful
      res.sendStatus(200);
      console.log('DELETE successful.');
    })
    .catch(error => {
      console.error(error);
      // Send a 500 (Internal Server Error) status code if there is an error
      res.sendStatus(500);
    });
});

// PUT request updating data in the admin table
router.put('/:id', (req, res) => {
  // SQL query to update the "name" field in the "feedback" table for a specific ID
  let queryText = `UPDATE "feedback" SET "name" = $1 WHERE "id" = $2;`;

  // Execute the SQL query to update the "name" field
  pool.query(queryText, [req.body.name, req.params.id])
    .then(result => {
      // Send a 200 (OK) status code if the PUT request is successful
      res.sendStatus(200);
      console.log('PUT successful.');
    })
    .catch(error => {
      console.error(error);
      // Send a 500 (Internal Server Error) status code if there is an error
      res.sendStatus(500);
    });
});

module.exports = router;