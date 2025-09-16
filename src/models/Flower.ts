import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface FlowerDocument extends Document {
  shopId: Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string | null;
  isBouquet?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const flowerSchema = new Schema<FlowerDocument>(
  {
    shopId: {
      type: Schema.Types.ObjectId,
      ref: "FlowerShop",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    isBouquet: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Flower: Model<FlowerDocument> = mongoose.models.Flower ||
  mongoose.model<FlowerDocument>("Flower", flowerSchema);

export default Flower;
