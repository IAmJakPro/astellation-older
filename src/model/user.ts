import { injectable } from 'inversify';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export interface ICreateUserRequest {
  email: string;
  password?: string | null;
  provider: string;
}

export interface IUserModel {
  _id?: string | null;
  email: string;
  password?: string | null;
  provider: string;
}

export interface IUserEntity {
  _id: string | null;
  email: string;
  password: string;
}

@injectable()
export default class UserSchema {
  getSchema() {
    const userSchema = new Schema({
      email: {
        type: String,
        required: true,
      },
      provider: {
        type: String,
        enum: ['google', 'facebook', 'local'],
        default: 'local',
      },
      password: {
        type: String,
      },
    });
    const UserModel = mongoose.models.User || model('User', userSchema);

    return UserModel;
  }
}
