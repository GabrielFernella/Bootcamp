import 'reflect-metadata'; // precisa desse recurso do TypeORM

import express from 'express';
import routes from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('\x1b[32m', 'Server started on http://localhost:3333 ✔');
});
