import mongoose, { Schema, Document } from 'mongoose'
import timestamps from 'mongoose-timestamp'
import { REGEX } from '../const/regexp'
import { LEARN_METHOD, REGIS_STATUS, CLASS_LEVEL } from '../const/common'

export interface RegisClassProps {
  _id?: string
  classId: string
  name: string
  phone: string
  address: string
  email: string
  facebookLink: string
  // method: LEARN_METHOD.OFFLINE | LEARN_METHOD.OFFLINE
  status: REGIS_STATUS.INIT | REGIS_STATUS.CHECKED | REGIS_STATUS.CONFIRMED | REGIS_STATUS.CANCELED
  // classLevel: CLASS_LEVEL.N1 | CLASS_LEVEL.N2 | CLASS_LEVEL.N3 | CLASS_LEVEL.N4 | CLASS_LEVEL.N5
  knowFrom: string
  everStudied: boolean
  leanTo: string
  note: string
  deleted: boolean
  userId: string
}

const RegisClassSchema: Schema = new mongoose.Schema({
  classId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        return REGEX.PHONE.test(value)
      },
      message: 'Invalid phone format',
    },
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        return REGEX.EMAIL.test(value)
      },
      message: 'Invalid email format',
    },
  },
  // method: {
  //   type: Number,
  //   required: true,
  //   validate: {
  //     validator: function (value: number) {
  //       return Object.values(LEARN_METHOD).includes(value as LEARN_METHOD)
  //     },
  //     message: 'Invalid phone format',
  //   },
  // },
  status: {
    type: Number,
    required: true,
    validate: {
      validator: function (value: number) {
        return Object.values(REGIS_STATUS).includes(value as REGIS_STATUS)
      },
      message: 'Invalid status',
    },
  },
  // classLevel: {
  //   type: String,
  //   required: true,
  //   validate: {
  //     validator: function (value: string) {
  //       return Object.values(CLASS_LEVEL).includes(value as CLASS_LEVEL)
  //     },
  //     message: 'Invalid phone format',
  //   },
  // },
  knowFrom: {
    type: String,
    required: true,
  },
  everStudied: {
    type: Boolean,
    required: true,
  },
  leanTo: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
})

RegisClassSchema.plugin(timestamps)

export const RegisClassModel = mongoose.model<Document & RegisClassProps>(
  'regisclasses',
  RegisClassSchema,
)
