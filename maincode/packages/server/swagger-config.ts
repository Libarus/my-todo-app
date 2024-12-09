const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API documentation',
            version: '1.0.0',
        },
    },
    apis: ['./app/serverjs/controllers/**/*.ts'],
};

export default swaggerJsdoc(options);