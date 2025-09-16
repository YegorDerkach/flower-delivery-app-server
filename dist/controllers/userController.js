"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFavorite = exports.createUser = exports.getUserByEmail = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUserByEmail = async (req, res) => {
    try {
        const user = await User_1.default.findOne({ email: req.params.email }).populate("favorites");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUserByEmail = getUserByEmail;
const createUser = async (req, res) => {
    try {
        const user = new User_1.default(req.body);
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createUser = createUser;
const addFavorite = async (req, res) => {
    try {
        const { flowerId } = req.body;
        const user = await User_1.default.findOneAndUpdate({ email: req.params.email }, { $addToSet: { favorites: flowerId } }, { new: true }).populate("favorites");
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.addFavorite = addFavorite;
exports.default = { getUserByEmail: exports.getUserByEmail, createUser: exports.createUser, addFavorite: exports.addFavorite };
