import { Router } from "express";
import multer from "multer";
import * as flowerController from "../controllers/flowerController";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/flowers");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", flowerController.getFlowers);
router.post("/", upload.single("image"), flowerController.createFlower);

export default router;
