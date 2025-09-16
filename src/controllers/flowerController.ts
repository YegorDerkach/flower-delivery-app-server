import { Request, Response } from "express";
import mongoose from "mongoose";
import Flower from "../models/Flower";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const getFlowers = async (req: Request, res: Response) => {
  try {
    const {
      shopId,
      sort = "createdAt",
      order = "asc",
      page = 1,
      limit = 10,
      isBouquet,
      minPrice,
      maxPrice,
    } = req.query as Record<string, any>;

    const filter: Record<string, any> = {};
    if (shopId) {
      filter.shopId = new mongoose.Types.ObjectId(String(shopId));
    }
    if (typeof isBouquet !== "undefined") {
      filter.isBouquet = String(isBouquet) === "true";
    }
    if (minPrice || maxPrice) {
      filter.price = {} as any;
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const flowers = await Flower.find(filter)
      .sort({ [String(sort)]: String(order) === "asc" ? 1 : -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Flower.countDocuments(filter);

    res.json({
      data: flowers,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createFlower = async (req: MulterRequest, res: Response) => {
  try {
    const flower = new Flower({
      name: (req.body as any).name,
      price: Number((req.body as any).price),
      shopId: (req.body as any).shopId,
      isBouquet: (req.body as any).isBouquet === true || (req.body as any).isBouquet === "true",
      imageUrl: req.file ? `/uploads/flowers/${req.file.filename}` : null,
    });

    await flower.save();
    res.status(201).json(flower);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export default { getFlowers, createFlower };
