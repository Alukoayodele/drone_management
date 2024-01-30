
import cors from 'cors';
import express, { json } from 'express';
import { errorHandler } from './middlewares';
import routes from '@resources/routes';

const app = express();

const allowedOrigins = ['http://localhost:4000'];

app.use(
    cors({
        exposedHeaders: [
            'Authorization',
            'refreshAuthorization',
            'isLoggedIn',
            'tokenExpiryTimeStamp',
        ],
        origin: allowedOrigins,
    })
);

app.use(json());

routes(app);

app.use(errorHandler);

export default app;