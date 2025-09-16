import { Router } from "express";
import * as couponController from "../controllers/couponController";

const router = Router();

router.get("/", couponController.getCoupons);
router.get("/:code", couponController.getCouponByCode);
router.post("/", couponController.createCoupon);

export default router;
