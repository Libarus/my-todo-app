import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import expressJSDocSwagger from 'express-jsdoc-swagger';

import { SequelizeInit, SequelizeSync } from './app/models';
import { RoutingInit } from './app/routing';

dotenv.config({ path: '../../.env' });

const { SERVER_PORT, CLIENT_PORT, CLIENT_ADDRESS } = process.env;

var corsOptions = {
    origin: `http://${CLIENT_ADDRESS}:${CLIENT_PORT}`,
    credentials: true,
};

const app = express();

app.use(cors(corsOptions));

// анализ запросов content-type - application/json
app.use(express.json());

// синтаксический анализ запросов content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// парсинг куки
app.use(cookieParser());

const options = {
    info: {
        version: '1.0.0',
        title: 'Albums store',
        license: {
            name: 'MIT',
        },
    },
    security: {
        BasicAuth: {
            type: 'http',
            scheme: 'basic',
        },
    },
    // Base directory which we use to locate your JSDOC files
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: './**/*.js',
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/api-docs',
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Expose Open API JSON Docs documentation in `apiDocsPath` path.
    exposeApiDocs: false,
    // Open API JSON Docs endpoint.
    apiDocsPath: '/v3/api-docs',
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
    // You can customize your UI options.
    // you can extend swagger-ui-express config. You can checkout an example of this
    // in the `example/configuration/swaggerOptions.js`
    swaggerUiOptions: {},
    // multiple option in case you want more that one instance
    multiple: true,
};

expressJSDocSwagger(app)(options);

SequelizeInit()
    .then(() => {
        console.log('Connection has been established successfully!');

        SequelizeSync()
            .then(() => {
                console.log('Database synchronized successfully!');
                RoutingInit(app, Number(SERVER_PORT));
            })
            .catch(err => {
                console.error(`Unable to synchronize the database :( => ${err.name} // ${err.message}`);
            });
    })
    .catch(err => {
        console.error(`Unable to connect to the database :( => ${err.name} // ${err.message}`);
    });
