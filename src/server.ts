import path from "path";
import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

dotenv.config({ path: path.join(__dirname, "./config/.env") });

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
