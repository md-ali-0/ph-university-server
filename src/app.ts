import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFoundHandler from './app/middleware/notFoundHandler';
import router from './app/routes';

const app: Application = express();

// Parser

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));

app.use('/api/v1/', router);

app.use('*', notFoundHandler);

app.use(globalErrorHandler);
export default app;
