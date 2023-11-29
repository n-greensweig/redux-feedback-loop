# Eval: A Full-stack Feedback App

## Table of Contents
- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Built With](#Built-With)
- [Contributing](#Contributing)

## Description
Eval is a full stack feedback app that allows users to add comprehensive. It includes a confetti effect on form submission and allows admin to sort users' feedback responses by the various data being collected in the survey. The app is built with React, Redux, Node.js, and Material UI, providing a dynamic and responsive user experience for both respondents and admin. Users' responses while the survey is in progress are stored in a Redux store to ensure users can go back to previous pages and see their responses to previous questions without losing their data.

## Installation

1. Create a database named ```prime_feedback```
2. Clone the repository: ```git clone https://github.com/n-greensweig/redux-feedback-loop.git```
3. The queries in the database.sql file are set up to create all necessary tables and populate the needed data to allow the app to run correctly. The project is built on PostgreSQL, so you will need to have PostgreSQL installed for the app to work. We recommend using Postico to run those queries as that was used to create the queries.
4. Open up your editor of choice and run an ```npm install```
5. Next, run ```npm install @mui/material @emotion/react @emotion/styled```, ```npm install @mui/icons-material```, and ```npm install @fontsource/roboto```
6. Run ```npm run server``` in your terminal
7. Run ```npm run client``` in your terminal
8. The ```npm run client``` command will open up a new browser tab for you

## Usage
After starting the application:
1. Navigate through the app by clicking on the 'Next' button.
2. Visit the ```/admin``` path to see all users' responses as an admin.
3. Sort responses as desired in the feedback table by clicking on the column heading you'd like to sort by in the feedback table.

## Built With
1. React.js - Frontend framework.
2. Redux - State management.
3. Node.js - Backend server.
4. Express - Server framework.
5. PostgreSQL - Database management.

## Contributing
Contributions are welcome. Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/YourFeature).
5. Open a pull request.
