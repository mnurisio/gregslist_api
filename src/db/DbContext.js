import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { HouseSchema } from '../models/House';

class DbContext {
  Houses = mongoose.model('House', HouseSchema)
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
