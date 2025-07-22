import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5001", credentials: true }));
app.use(express.json());
app.use(cookieParser());

//routes ---
app.use("/api/admin", adminRoutes);

connectDB();
const PORT = process.env.PORT || 6600;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
