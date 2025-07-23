import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true, trim: true },
      ar: { type: String, required: true, trim: true },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categorySchema);
