import express from 'express';
import { Hello } from './routes';

const app = express();

app.get('/', Hello);

app.listen(3333);
