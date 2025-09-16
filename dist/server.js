"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "./config/.env") });
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
(0, db_1.default)().then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
