require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require('express');

const app = express();

app.use(express.json());

const PORT = process.env.APP_PORT || 6000;

app.listen(PORT, () => {
    console.log('Server up and running', PORT);
});