import mongoose, { Document, Model, Schema } from "mongoose";

export interface FlowerShopDocument extends Document {
  name: string;
  address: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const flowerShopSchema = new Schema<FlowerShopDocument>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String },
  },
  { timestamps: true }
);

const FlowerShop: Model<FlowerShopDocument> = mongoose.models.FlowerShop ||
  mongoose.model<FlowerShopDocument>("FlowerShop", flowerShopSchema);

export default FlowerShop;
