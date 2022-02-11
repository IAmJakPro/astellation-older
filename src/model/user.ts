import { injectable } from 'inversify';
import mongoose, { mongo } from 'mongoose';

const { Schema, model } = mongoose;

@injectable()
export default class UserSchema {
  getSchema() {
    const userSchema = new Schema({
      name: {
        type: String,
        required: true,
      },
    });
    const UserModel = mongoose.models.User || model('User', userSchema);

    return UserModel;
  }
}
