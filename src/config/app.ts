import { inject, injectable } from 'inversify';
import express, { Application, Express } from 'express';
import TYPES from '../constants/types';
import MongoDBConnect from './db';
import morgan from 'morgan';
import helmet from 'helmet';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from '../utils/container';
import passport from 'passport';
//import session from 'express-session';

@injectable()
export default class App {
  private readonly _app: InversifyExpressServer;
  private readonly _mongoDbConnect: MongoDBConnect;
  private static readonly NODE_ENV: string =
    process.env.NODE_ENV || 'development';

  constructor(@inject(TYPES.MongoDbConnect) mongoDbConnect: MongoDBConnect) {
    this._app = new InversifyExpressServer(container/* , null, {
      rootPath: '/api',
    } */);
    this._mongoDbConnect = mongoDbConnect;
  }

  start(): Application {
    this._app.setConfig((app) => {
      if (App.NODE_ENV === 'development') app.use(morgan('dev'));
      app.use(helmet());
      app.use(
        express.urlencoded({
          extended: true,
          limit: '10kb',
        })
      );
      app.use(express.json());

      /* app.use(
        session({
          secret: process.env.JWT_SERCRET,
          resave: false,
          saveUninitialized: true,
        })
      ); */

      app.use(passport.initialize());
      //app.use(passport.session());
    });

    let app = this._app.build();

    return app;
  }

  async connectMongo(): Promise<void> {
    await this._mongoDbConnect.connect().then(() => {
      console.log('MongoDB connected');
    });
  }
}
