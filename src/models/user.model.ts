import mongoose, { Schema, Document } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { REGEX } from '../const/regexp';

export interface UserProps {
  name: string;
  facebookId?: string;
  avatar?: string;
  gender: string;
  yOB: number;
  status: number;
  deleted: boolean;
  password: string;
  role: number;
  email: string;
}

export interface UserModelProps extends Document {
  name: string;
  facebookId?: string;
  avatar?: string;
  gender: string;
  yOB: number;
  status: string;
  deleted: boolean;
  password: string;
  role: string;
  email: string;
}

const UserSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  facebookId: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: true,
  },
  yOB: {
    type: Number,
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
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value: string) {
        return REGEX.EMAIL.test(value);
      },
      message: "Invalid email format",
    },
  },
});

UserSchema.plugin(timestamps);

export const UserModel =  mongoose.model<UserModelProps>("users", UserSchema);