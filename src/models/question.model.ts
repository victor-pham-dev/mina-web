import mongoose, { Schema, Document } from 'mongoose'
import timestamps from 'mongoose-timestamp'
import { CLASS_LEVEL } from 'src/const/common'

export interface QuestionProps {
  _id?: string
  question: string
  answers: string[]
  level: CLASS_LEVEL
  deleted: Boolean
}

const QuestionSchema: Schema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
  },
})

QuestionSchema.plugin(timestamps)

export const QuestionModel = mongoose.model<Document & QuestionProps>('questions', QuestionSchema)
