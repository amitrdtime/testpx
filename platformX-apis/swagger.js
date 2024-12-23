const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
      url: 'http://localhost:5000',
    },
  ],
};

// Options for the swagger docs
const swaggerOptions = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions 
  apis: ['./routes/**/*.js']
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
