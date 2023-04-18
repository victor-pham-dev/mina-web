import mongoose, { Schema, Document } from 'mongoose'
import timestamps from 'mongoose-timestamp'
import { CLASS_LEVEL, CLASS_STATUS } from '../const/common'
import { LogProps } from './common-types'

export interface ClassProps {
  _id?: string
  classLevel: CLASS_LEVEL.N1 | CLASS_LEVEL.N2 | CLASS_LEVEL.N3 | CLASS_LEVEL.N4 | CLASS_LEVEL.N5
  numberOfStudents: number
  numberOfLessons: number
  startDate: string
  time: any
  daysOfWeek: string[]
  description: string
  creatorId: string
  teacher?: string
  deleted: Boolean
  recruiting: Boolean
  logs: LogProps[]
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
  numberOfLessons: {
    type: Number,
    required: true,
  },
  daysOfWeek: {
    type: Array,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  time: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creatorId: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: false,
    default: '',
  },
  status: {
    type: Number,
    required: true,
    default: CLASS_STATUS.OPEN,
  },
  recruiting: {
    type: Boolean,
    required: true,
    default: true,
  },
  logs: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
})

ClassSchema.plugin(timestamps)

export const ClassModel = mongoose.model<ClassProps & Document>('classes', ClassSchema)
