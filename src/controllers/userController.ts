import { Request, Response } from "express";
import User from "../models/User";

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.params.email }).populate("favorites");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { flowerId } = req.body as { flowerId: string };
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { $addToSet: { favorites: flowerId } },
      { new: true }
    ).populate("favorites");
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export default { getUserByEmail, createUser, addFavorite };
