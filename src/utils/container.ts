import { Container } from 'inversify';
import TYPES from './../constants/types';

import { UserService } from '../services/user';
import App from '../config/app';
import MongoDBConnect from '../config/db';
import { UserController } from '../controllers/user';
import UserSchema from '../model/user';

// load everything needed to the Container
let container = new Container();

container.bind<App>(TYPES.App).to(App);
container.bind<MongoDBConnect>(TYPES.MongoDbConnect).to(MongoDBConnect);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserSchema>(TYPES.UserSchema).to(UserSchema);
container.bind<UserController>(TYPES.UserController).to(UserController);

export { container };
