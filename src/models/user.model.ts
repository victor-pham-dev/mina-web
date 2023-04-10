import mongoose, { Schema, Document } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export interface IUser extends Document {
  name: string;
  facebookId?: string;
  avatar?: string;
  gender: string;
  yOB: number;
  status: string;
  deleted: boolean;
  password: string;
  role: string;
  phone: string;
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
    type: String,
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
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^(0[3578]{1}[0-9]{8})$/.test(value);
      },
      message: "Invalid phone number format",
    },
  },
});

UserSchema.plugin(timestamps);

export default mongoose.model<IUser>("users", UserSchema);