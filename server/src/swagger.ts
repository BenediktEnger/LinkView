import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API for my application',
    },
    servers: [
      {
        url: 'http://localhost:3002',
      },
    ],
  },
  apis: ['**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;