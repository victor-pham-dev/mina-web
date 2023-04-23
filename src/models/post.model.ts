import mongoose, { Schema, Document } from 'mongoose'
import timestamps from 'mongoose-timestamp'
import { POST_STATUS } from 'src/const/common'

export interface PostProps {
  _id?: string
  title: string
  type: string
  content: string
  cardImg: string
  author: {
    id: string
    name: string
  }
  status: POST_STATUS
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
  cardImg: {
    type: String,
    required: true,
  },
  author: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
  },
})

PostSchema.plugin(timestamps)

export const PostModel = mongoose.model<Document & PostProps>('posts', PostSchema)
