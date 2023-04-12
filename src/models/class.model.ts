import mongoose, { Schema, Document } from 'mongoose'
import timestamps from 'mongoose-timestamp'
import { CLASS_STATUS } from 'src/const/common'

export interface ClassProps {
  _id?: string
  classLevel: string
  numberOfStudents: number
  startDate: string
  endDateExpected: string
  creatorId: string
  teacher: string
  deleted: Boolean
  status: CLASS_STATUS.OPEN | CLASS_STATUS.PROCESSING | CLASS_STATUS.END
}

const ClassSchema: Schema = new mongoose.Schema({
  classLevel: {
    type: String,
    required: true,
  },
  numberOfStudents: {
    type: Number,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDateExpected: {
    type: String,
    required: true,
  },
  creatorId: {
    type: String,
    required: true,
  },
  teacher: {
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

ClassSchema.plugin(timestamps)

export const ClassModel = mongoose.model<ClassProps & Document>('classes', ClassSchema)
