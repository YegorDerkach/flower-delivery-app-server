import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface OrderProduct {
  flowerId: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface OrderDocument extends Document {
  orderId: string;
  userId?: Types.ObjectId | null;
  products: OrderProduct[];
  totalPrice: number;
  email: string;
  phone: string;
  address: string;
  deliveryTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<OrderDocument>(
  {
    orderId: { type: String, unique: true, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      new Schema<OrderProduct>(
        {
          flowerId: {
            type: Schema.Types.ObjectId,
            ref: "Flower",
            required: true,
          },
          quantity: { type: Number, required: true, min: 1 },
          price: { type: Number, required: true },
        },
        { _id: false }
      ),
    ],
    totalPrice: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    deliveryTime: { type: Date },
  },
  { timestamps: true }
);

const Order: Model<OrderDocument> = mongoose.models.Order ||
  mongoose.model<OrderDocument>("Order", orderSchema);

export default Order;
