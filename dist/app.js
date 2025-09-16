"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const flowerShopRouter_1 = __importDefault(require("./routes/flowerShopRouter"));
const flowerRouter_1 = __importDefault(require("./routes/flowerRouter"));
const orderRouter_1 = __importDefault(require("./routes/orderRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const couponRouter_1 = __importDefault(require("./routes/couponRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/shops", flowerShopRouter_1.default);
app.use("/api/flowers", flowerRouter_1.default);
app.use("/api/orders", orderRouter_1.default);
app.use("/api/users", userRouter_1.default);
app.use("/api/coupons", couponRouter_1.default);
app.use("/uploads", express_1.default.static("uploads"));
app.get("/", (req, res) => {
    res.send("Flower Delivery API is running ");
});
exports.default = app;
