import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    skuId: { type: String, required: true, unique: true, trim: true },
    weight: { type: Number, required: true },
    title: {
      en: { type: String, required: true, trim: true },
      ar: { type: String, required: true, trim: true },
    },
    images: [{ type: String }],
    price: { type: Number, required: true },
    priceArabic: { type: String, required: true, trim: true },
    currency: { type: String, required: true, enum: ["AED", "USD", "EUR"] },
    status: { type: Boolean, default: true },
    size: { type: String, required: true },
  },
  { _id: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true, trim: true },
      ar: { type: String, required: true, trim: true },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    productBenefits: {
      en: { type: String, default: "" },
      ar: { type: String, default: "" },
    },
    methodsOfUse: {
      en: { type: String, default: "" },
      ar: { type: String, default: "" },
    },
    productComposition: {
      en: { type: String, default: "" },
      ar: { type: String, default: "" },
    },
    productSummary: {
      en: { type: String, default: "" },
      ar: { type: String, default: "" },
    },
    ingredients: [{ type: String, trim: true }],
    variants: [variantSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
