"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCoupon = exports.getCouponByCode = exports.getCoupons = void 0;
const Coupon_1 = __importDefault(require("../models/Coupon"));
const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon_1.default.find({ validUntil: { $gt: new Date() } });
        res.json(coupons);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getCoupons = getCoupons;
const getCouponByCode = async (req, res) => {
    try {
        const coupon = await Coupon_1.default.findOne({ code: req.params.code });
        if (!coupon)
            return res.status(404).json({ message: "Coupon not found" });
        res.json(coupon);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getCouponByCode = getCouponByCode;
const createCoupon = async (req, res) => {
    try {
        const coupon = new Coupon_1.default(req.body);
        await coupon.save();
        res.status(201).json(coupon);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createCoupon = createCoupon;
exports.default = { getCoupons: exports.getCoupons, getCouponByCode: exports.getCouponByCode, createCoupon: exports.createCoupon };
