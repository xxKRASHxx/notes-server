import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import logger from './logger'
import * as users from './routes/users'
import * as notes from './routes/notes'

const app = express()

app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.use(logger)

users.routesConfig(app)
notes.routesConfig(app)

export default app;
