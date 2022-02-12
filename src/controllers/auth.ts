import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import { UserService } from '../services/user';
import TYPES from '../constants/types';
import { AuthService } from '../services/auth';
import passport from 'passport';
import { IUserModel } from '../model/user';

@controller('/')
export class AuthController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.AuthService) private authService: AuthService
  ) {}
  @httpPost('email')
  public async signupEmail(req: Request, res: Response) {
    try {
      const foundUser = await this.userService.getUserByEmail(req.body.email);
      if (foundUser) {
        res.status(401).send({ status: 'error', data: 'User already exists!' });
      }
      const { token, user } = await this.authService.createAndSetToken(
        req.body
      );
      res.status(201).send({ status: 'success', data: { user, token } });
    } catch (err) {
      res.status(400).json({ status: 'error', data: err.message });
    }
  }

  @httpGet(
    'api/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  )
  public googleAuth() {}

  @httpGet('googleRedirect', passport.authenticate('google'))
  public async googleRedirect(req: Request, res: Response) {
    console.log('redirected', req.user);
    try {
      const reqUser: IUserModel = req.user as IUserModel;
      const { token, user } = await this.authService.createAndSetToken({
        email: reqUser.email,
        provider: reqUser.provider,
      });
      res.status(201).send({ status: 'success', data: { user, token } });
    } catch (err) {
      res.status(400).send({ status: 'error', data: err.message });
    }
  }

  @httpGet(
    'api/auth/facebook',
    passport.authenticate('facebook', { scope: ['profile', 'email'] })
  )
  public facebookAuth() {}

  @httpGet('facebookRedirect', passport.authenticate('facebook'))
  public async facebookRedirect(req: Request, res: Response) {
    console.log('redirected', req.user);
    try {
      const reqUser: IUserModel = req.user as IUserModel;
      const { token, user } = await this.authService.createAndSetToken({
        email: reqUser.email,
        provider: 'facebook',
      });
      res.status(201).send({ status: 'success', data: { user, token } });
    } catch (err) {
      res.status(400).send({ status: 'error', data: err.message });
    }
  }

  // Only authenticated users
  @httpGet('api/profile', passport.authenticate('jwt', { session: false }))
  public getProfile(req: Request, res: Response) {
    res.status(200).json({
      status: 'success',
      data: req.user,
    });
  }
}
