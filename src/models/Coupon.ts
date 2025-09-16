import mongoose, { Document, Model, Schema } from "mongoose";

export interface CouponDocument extends Document {
  code: string;
  discountType: " " | "fixed";
  discountValue: number;
  validUntil: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const couponSchema = new Schema<CouponDocument>(
  {
    code: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ["percent", "fixed"], required: true },
    discountValue: { type: Number, required: true },
    validUntil: { type: Date, required: true },
  },
  { timestamps: true }
);

const Coupon: Model<CouponDocument> =
  mongoose.models.Coupon ||
  mongoose.model<CouponDocument>("Coupon", couponSchema);

export default Coupon;
