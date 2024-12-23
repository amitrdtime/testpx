import express from 'express';
import cors from 'cors';
import setupSwagger from './swagger.js';
import clientRoutes from './routes/clients.js';
import metadataRoutes from './routes/metaData.js';
import bodyParser from 'body-parser';
import resourceRoutes from './routes/resourceRoute.js';
import sowRoutes from './routes/sowsRoute.js';
import projectRoutes from './routes/projectRoutes.js'; 
import sequelize from 'platformxdb-clientmodule/config/database.js';

const app = express();
const port = 2000;

// Use CORS middleware
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

app.use('/clients', clientRoutes);
app.use('/clients/metadata', metadataRoutes);
app.use('/resources', resourceRoutes);
app.use('/client', sowRoutes);
app.use('/client/:clientId/sow/:sowId', projectRoutes);

// Set up Swagger
setupSwagger(app);

(async () => {
  try {
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
  console.log(`Client-Service running at http://localhost:${port}`);
});
