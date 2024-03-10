import 'dotenv/config';
import 'express-async-errors';

import * as Sentry from '@sentry/node';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import './config/sentry';

import { stream } from './config/logger';
import errorHandler from './handlers/errorHandler';
import responseHandler from './handlers/responseHandler';
import routes from './routes';

const app = express();

app.use(Sentry.Handlers.requestHandler());
app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream }));
app.use(helmet());

app.use(routes);

app.use(responseHandler);
app.use(errorHandler);

app.use(Sentry.Handlers.errorHandler());

export default app;
