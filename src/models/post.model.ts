import mongoose, { Schema, Document } from 'mongoose'
import timestamps from 'mongoose-timestamp'

export interface PostProps {
  _id?: string
  title: string
  type: string
  content: string
  deleted: Boolean
}

const PostSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
  },
})

PostSchema.plugin(timestamps)

export const PostModel = mongoose.model<Document & PostProps>('posts', PostSchema)
