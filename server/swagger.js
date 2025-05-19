const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'VMS API',
            version: '1.0.0',
            description: 'Api for managing vehicles',
        },
        servers: [{
        url: 'http://localhost:5000',
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./routes/vehicleRoutes.js', './routes/authRoutes.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;