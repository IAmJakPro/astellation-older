import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import { Model } from 'mongoose';
import { UserService } from './user';
import AppError from '../utils/appError';
import jwt from 'jsonwebtoken';
import UserSchema, { ICreateUserRequest, IUserModel } from '../model/user';

@injectable()
export class AuthService {
  private readonly _userSchema: Model<UserSchema>;
  private readonly _userService: UserService;

  constructor(
    @inject(TYPES.UserSchema) userSchema: UserSchema,
    @inject(TYPES.UserService) userService: UserService
  ) {
    this._userSchema = userSchema.getSchema();
    this._userService = userService;
  }

  private signToken(id: string): string {
    return jwt.sign({ id }, process.env.JWT_SERCRET, {
      expiresIn: 60 * 60 * 24 * 30,
    });
  }

  async createAndSetToken(
    createUserObj: ICreateUserRequest
  ): Promise<{ token: string; user: IUserModel }> {
    const foundUser = await this._userService.getUserByEmail(
      createUserObj.email
    );
    if (foundUser) {
      const token: string = this.signToken(foundUser._id);
      return { token, user: foundUser };
    }

    const user = await this._userService.createUser(createUserObj);

    const token: string = this.signToken(user._id);

    return { token, user };
  }
}
