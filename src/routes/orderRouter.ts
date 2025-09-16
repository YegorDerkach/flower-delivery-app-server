import { Router } from "express";
import * as orderController from "../controllers/orderController";

const router = Router();

router.get("/", orderController.getOrders);
router.get("/search", orderController.searchOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", orderController.createOrder);

export default router;
