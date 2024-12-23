import express from 'express';
import cors from 'cors';
import setupSwagger from './swagger.js';
import userRoutes from './routes/users.js';
import userRoles from './routes/roles.js'
import bodyParser from 'body-parser';
import sequelize from 'platformxdb-usermodule/config/database.js';

const app = express();
const port = 1000;

// Use CORS middleware
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());


app.use('/api/users', userRoutes);
app.use('/roles', userRoles);

// Set up Swagger
setupSwagger(app); 


(async () => {
  try {
    console.log('Database authentication request in progress');
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync all models
    await sequelize.sync({ force: false });  // Use { force: true } to reset tables
    console.log('Database synchronized');

    // Now you can start interacting with models
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});