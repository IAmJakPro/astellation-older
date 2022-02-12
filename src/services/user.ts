import { inject, injectable } from 'inversify';
import UserSchema, {
  ICreateUserRequest,
  IUserEntity,
  IUserModel,
} from '../model/user';
import TYPES from '../constants/types';
import { Model, Document } from 'mongoose';

@injectable()
export class UserService {
  private readonly _userSchema: Model<UserSchema>;

  constructor(@inject(TYPES.UserSchema) userSchema: UserSchema) {
    this._userSchema = userSchema.getSchema();
  }

  async getUsers(): Promise<IUserModel[]> {
    const users: IUserModel[] = await this._userSchema.find({});
    return users;
  }

  async getUserByEmail(email: string): Promise<IUserModel> {
    const user: IUserModel = await this._userSchema.findOne({ email: email });
    return user;
  }

  async createUser(user: ICreateUserRequest): Promise<IUserModel> {
    const insertedUser = await this._userSchema.create(user);
    return insertedUser as unknown as IUserModel;
  }

  async getUserById(id: string): Promise<IUserModel> {
    const user: IUserModel = await this._userSchema.findById(id);
    return user;
  }
}
