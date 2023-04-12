import { Model } from "mongoose"
import { UserModelProps, UserModel } from "./user.model"
import { url } from "../config/db.config"
import mongoose from "mongoose"

mongoose.Promise = global.Promise
interface databaseProps {
  mongoose: any
  url: string
  users: Model<UserModelProps>
}
const database: databaseProps = {
  mongoose: mongoose,
  url: url,
  users: UserModel
}

export { database }
