import { Router } from "express";
import * as flowerShopController from "../controllers/flowerShopController";

const router = Router();

router.get("/", flowerShopController.getShops);
router.post("/", flowerShopController.createShop);

export default router;
