import { injectable } from 'inversify';
import mongoose from 'mongoose';

@injectable()
export default class MongoDBConnect {
  private readonly _stringConnection: string;
  constructor() {
    this._stringConnection = process.env.MONGODB_DB_URL || '';
  }

  async connect(): Promise<void> {
    await mongoose.connect(this._stringConnection);
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }

  async dropDatabase(): Promise<void> {
    await mongoose.connection.dropDatabase();
  }
}
