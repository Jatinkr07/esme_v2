import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import dotenv from "dotenv";

dotenv.config();
const seedAdmin = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://esmetest:esmetest@esme-test.w7sjieu.mongodb.net/?retryWrites=true&w=majority&appName=esme-test"
    );

    const admin = await Admin.findOne({ username: "admin" });
    if (!admin) {
      await Admin.create({
        username: "admin",
        password: "admin",
      });
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
