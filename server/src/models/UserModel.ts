import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: false,
    },
  },
  { timestamps: true }
);

type UserModel = InferSchemaType<typeof userSchema>;
export default model<UserModel>("User", userSchema);
