"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../.env") });
const connectDB = async () => {
    try {
        const uri = process.env.DB_URI;
        if (!uri) {
            console.warn("DB_URI is not defined. Skipping DB connection (dev mode).\nStatic files and non-DB routes will still work.");
            return;
        }
        await mongoose_1.default.connect(uri);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("MongoDB connection failed:", error?.message || error);
    }
};
exports.connectDB = connectDB;
exports.default = exports.connectDB;
