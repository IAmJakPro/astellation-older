import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  request,
  response,
  next,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import User, { IUser } from '../model/user';
import { UserService } from '../services/user';
import TYPES from '../constants/types';
import * as express from 'express';

@controller('/users')
export class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  @httpGet('/')
  public async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getUsers();
      res.status(201).send({ status: 'success', data: users });
    } catch (err) {
      res.status(400).json({ status: 'error', data: err.message });
    }
  }

  @httpPost('/')
  private async newUser(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const insertedUser = await this.userService.createUser(req.body);
      return res.status(201).json({ status: 'success', data: insertedUser });
    } catch (err) {
      return res.status(400).json({ status: 'error', data: err.message });
    }
  }
}
