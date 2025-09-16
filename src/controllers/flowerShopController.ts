import { Request, Response } from "express";
import FlowerShop from "../models/FlowerShop";

export const getShops = async (req: Request, res: Response) => {
  try {
    const shops = await FlowerShop.find();
    res.json(shops);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createShop = async (req: Request, res: Response) => {
  try {
    const shop = new FlowerShop(req.body);
    await shop.save();
    res.status(201).json(shop);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export default { getShops, createShop };
