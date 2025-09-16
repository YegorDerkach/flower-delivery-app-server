import { Request, Response } from "express";
import Order from "../models/Order";
import Flower from "../models/Flower";

const generateOrderId = (): string => {
  const timestamp = Date.now();
  return `ORD-${timestamp}`;
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("products.flowerId")
      .populate("userId");
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id })
      .populate("products.flowerId")
      .populate("userId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const searchOrders = async (req: Request, res: Response) => {
  try {
    const { email, last5, phone } = req.query as {
      email?: string;
      last5?: string;
      phone?: string;
    };
    if (!email && !last5 && !phone) {
      return res.status(400).json({ message: "Provide email, phone or last5" });
    }

    const filter: any = {};
    if (email) filter.email = email;
    if (phone) filter.phone = phone;
    if (last5) filter.orderId = { $regex: `${last5}$` };

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("products.flowerId");
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderId = generateOrderId();

    const productsWithPrices = await Promise.all(
      (req.body.products as Array<{ flowerId: string; quantity: number }>).map(
        async (p) => {
          const flower = await Flower.findById(p.flowerId);
          return {
            flowerId: p.flowerId as any,
            quantity: p.quantity,
            price: flower ? flower.price : 0,
          };
        }
      )
    );

    const totalPrice = req.body.totalPrice;

    const order = new Order({
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
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export default { getOrders, getOrderById, searchOrders, createOrder };
