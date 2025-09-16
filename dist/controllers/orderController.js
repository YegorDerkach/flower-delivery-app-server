"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.searchOrders = exports.getOrderById = exports.getOrders = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const Flower_1 = __importDefault(require("../models/Flower"));
const generateOrderId = () => {
    const timestamp = Date.now();
    return `ORD-${timestamp}`;
};
const getOrders = async (req, res) => {
    try {
        const orders = await Order_1.default.find()
            .populate("products.flowerId")
            .populate("userId");
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getOrders = getOrders;
const getOrderById = async (req, res) => {
    try {
        const order = await Order_1.default.findOne({ orderId: req.params.id })
            .populate("products.flowerId")
            .populate("userId");
        if (!order)
            return res.status(404).json({ message: "Order not found" });
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getOrderById = getOrderById;
const searchOrders = async (req, res) => {
    try {
        const { email, last5, phone } = req.query;
        if (!email && !last5 && !phone) {
            return res.status(400).json({ message: "Provide email, phone or last5" });
        }
        const filter = {};
        if (email)
            filter.email = email;
        if (phone)
            filter.phone = phone;
        if (last5)
            filter.orderId = { $regex: `${last5}$` };
        const orders = await Order_1.default.find(filter)
            .sort({ createdAt: -1 })
            .limit(20)
            .populate("products.flowerId");
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.searchOrders = searchOrders;
const createOrder = async (req, res) => {
    try {
        const orderId = generateOrderId();
        const productsWithPrices = await Promise.all(req.body.products.map(async (p) => {
            const flower = await Flower_1.default.findById(p.flowerId);
            return {
                flowerId: p.flowerId,
                quantity: p.quantity,
                price: flower ? flower.price : 0,
            };
        }));
        const totalPrice = req.body.totalPrice;
        const order = new Order_1.default({
            orderId,
            products: productsWithPrices,
            totalPrice,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            deliveryTime: req.body.deliveryTime,
            userId: req.body.userId || null,
        });
        await order.save();
        res.status(201).json(order);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createOrder = createOrder;
exports.default = { getOrders: exports.getOrders, getOrderById: exports.getOrderById, searchOrders: exports.searchOrders, createOrder: exports.createOrder };
