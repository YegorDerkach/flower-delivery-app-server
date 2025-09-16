import { Request, Response } from "express";
import Coupon from "../models/Coupon";

export const getCoupons = async (req: Request, res: Response) => {
  try {
    const coupons = await Coupon.find({ validUntil: { $gt: new Date() } });
    res.json(coupons);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCouponByCode = async (req: Request, res: Response) => {
  try {
    const coupon = await Coupon.findOne({ code: req.params.code });
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });
    res.json(coupon);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createCoupon = async (req: Request, res: Response) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json(coupon);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export default { getCoupons, getCouponByCode, createCoupon };
