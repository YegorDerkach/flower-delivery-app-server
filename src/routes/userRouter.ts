import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

router.get(`/:email`, userController.getUserByEmail);
router.post(`/`, userController.createUser);
router.put(`/:email/favorites`, userController.addFavorite);

export default router;
