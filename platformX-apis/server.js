const express = require('express');
const cors = require('cors');
const setupSwagger = require('./swagger');
const bodyParser =require('body-parser');
const proxy = require('express-http-proxy');
const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

const userServiceProxy = proxy('http://localhost:1000');
const clientServiceProxy = proxy('http://localhost:2000');

app.use('/user-service',userServiceProxy);
app.use('/client-service', clientServiceProxy);

// Set up Swagger
setupSwagger(app);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
