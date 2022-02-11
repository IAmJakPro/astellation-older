import { inject, injectable } from 'inversify';
import User, { IUser } from '../model/user';
import TYPES from '../constants/types';
import UserSchema from '../model/user';
import { Model } from 'mongoose';

@injectable()
export class UserService {
  private readonly _userSchema: Model<UserSchema>;

  constructor(@inject(TYPES.UserSchema) userSchema: UserSchema) {
    this._userSchema = userSchema.getSchema();
  }

  async getUsers(): Promise<IUser[]> {
    const users: IUser[] = await this._userSchema.find({});
    return users;
  }

  async createUser(user: IUser): Promise<IUser> {
    const insertedUser = await this._userSchema.create(user);
    return insertedUser as unknown as IUser;
  }
}
