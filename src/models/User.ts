import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  phone?: string;
  favorites: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Flower" }],
  },
  { timestamps: true }
);

const User: Model<UserDocument> = mongoose.models.User ||
  mongoose.model<UserDocument>("User", userSchema);

export default User;
