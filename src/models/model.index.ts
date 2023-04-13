import { Model, Document } from 'mongoose'
import { url } from '../config/db.config'
import mongoose from 'mongoose'
import { UserModel, UserProps } from './user.model'
import { ClassModel, ClassProps } from './class.model'
import { RegisClassModel, RegisClassProps } from './regis-class.model'
import { PostModel, PostProps } from './post.model'

mongoose.Promise = global.Promise
interface databaseProps {
  mongoose: any
  url: string
  users: Model<Document & UserProps>
  regisclasses: Model<Document & RegisClassProps>
  classes: Model<Document & ClassProps>
  posts: Model<Document & PostProps>
}
const database: databaseProps = {
  mongoose: mongoose,
  url: url,
  users: UserModel,
  regisclasses: RegisClassModel,
  classes: ClassModel,
  posts: PostModel,
}

export { database }
