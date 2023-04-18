import mongoose, { Schema, Document } from 'mongoose'
import timestamps from 'mongoose-timestamp'

export interface StudentProps {
  _id?: string
  regisId: string
  deleted: Boolean
  classId: string
  createdAt?: string
  updatedAt?: string
}

const StudentSchema: Schema = new mongoose.Schema({
  regisId: {
    type: String,
    required: true,
  },

  classId: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
  },
})

StudentSchema.plugin(timestamps)

export const StudentModel = mongoose.model<Document & StudentProps>('students', StudentSchema)
