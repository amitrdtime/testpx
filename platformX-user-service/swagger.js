import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Platform X',
    version: '1.0.0',
    description: 'API documentation for Platform X',
  },
  servers: [
    {
      url: 'http://localhost:1000',
    },
  ],
};

// Options for the swagger docs
const swaggerOptions = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions 
  apis: ['./routes/*js']
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};