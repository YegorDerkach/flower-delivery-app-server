"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFlower = exports.getFlowers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Flower_1 = __importDefault(require("../models/Flower"));
const getFlowers = async (req, res) => {
    try {
        const { shopId, sort = "createdAt", order = "asc", page = 1, limit = 10, isBouquet, minPrice, maxPrice, } = req.query;
        const filter = {};
        if (shopId) {
            filter.shopId = new mongoose_1.default.Types.ObjectId(String(shopId));
        }
        if (typeof isBouquet !== "undefined") {
            filter.isBouquet = String(isBouquet) === "true";
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice)
                filter.price.$gte = Number(minPrice);
            if (maxPrice)
                filter.price.$lte = Number(maxPrice);
        }
        const flowers = await Flower_1.default.find(filter)
            .sort({ [String(sort)]: String(order) === "asc" ? 1 : -1 })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));
        const total = await Flower_1.default.countDocuments(filter);
        res.json({
            data: flowers,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getFlowers = getFlowers;
const createFlower = async (req, res) => {
    try {
        const flower = new Flower_1.default({
            name: req.body.name,
            price: Number(req.body.price),
            shopId: req.body.shopId,
            isBouquet: req.body.isBouquet === true || req.body.isBouquet === "true",
            imageUrl: req.file ? `/uploads/flowers/${req.file.filename}` : null,
        });
        await flower.save();
        res.status(201).json(flower);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createFlower = createFlower;
exports.default = { getFlowers: exports.getFlowers, createFlower: exports.createFlower };
