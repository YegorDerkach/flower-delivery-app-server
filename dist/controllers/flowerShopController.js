"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShop = exports.getShops = void 0;
const FlowerShop_1 = __importDefault(require("../models/FlowerShop"));
const getShops = async (req, res) => {
    try {
        const shops = await FlowerShop_1.default.find();
        res.json(shops);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getShops = getShops;
const createShop = async (req, res) => {
    try {
        const shop = new FlowerShop_1.default(req.body);
        await shop.save();
        res.status(201).json(shop);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createShop = createShop;
exports.default = { getShops: exports.getShops, createShop: exports.createShop };
