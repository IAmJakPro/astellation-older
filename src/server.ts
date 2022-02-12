import 'reflect-metadata';
//import 'module-alias/register';
import App from './config/app';
import PassPortAuth from './config/passport';
import TYPES from './constants/types';
import { container } from './utils/container';

require('dotenv').config();

const app = container.get<App>(TYPES.App);
const passport = container.get<PassPortAuth>(TYPES.PassPortAuth);
passport.fetchStrategies();

const server = app.start();

const PORT = process.env.PORT || 5000;

app.connectMongo().then(() => {
  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
