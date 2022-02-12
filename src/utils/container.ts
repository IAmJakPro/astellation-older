import { Container } from 'inversify';
import TYPES from './../constants/types';

import { UserService } from '../services/user';
import App from '../config/app';
import MongoDBConnect from '../config/db';
import { UserController } from '../controllers/user';
import UserSchema from '../model/user';
import PassPortAuth from '../config/passport';
import { AuthService } from '../services/auth';
import { AuthController } from '../controllers/auth';

// load everything needed to the Container
let container = new Container();

container.bind<App>(TYPES.App).to(App);
container.bind<MongoDBConnect>(TYPES.MongoDbConnect).to(MongoDBConnect);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserSchema>(TYPES.UserSchema).to(UserSchema);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<PassPortAuth>(TYPES.PassPortAuth).to(PassPortAuth);

export { container };
