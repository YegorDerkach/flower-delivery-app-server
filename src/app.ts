import express, { Request, Response } from "express";
import cors from "cors";

import flowerShopRoutes from "./routes/flowerShopRouter";
import flowerRoutes from "./routes/flowerRouter";
import orderRoutes from "./routes/orderRouter";
import userRoutes from "./routes/userRouter";
import couponRoutes from "./routes/couponRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/shops", flowerShopRoutes);
app.use("/api/flowers", flowerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/coupons", couponRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/", (req: Request, res: Response) => {
  res.send("Flower Delivery API is running ");
});

export default app;
