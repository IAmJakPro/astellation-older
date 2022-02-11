import 'reflect-metadata';
//import 'module-alias/register';
import App from './config/app';
import TYPES from './constants/types';
import { container } from './utils/container';

require('dotenv').config();

const app = container.get<App>(TYPES.App);

const server = app.start();

const PORT = process.env.PORT || 3000;

app.connectMongo().then(() => {
  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
