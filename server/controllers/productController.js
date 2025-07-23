import Busboy from "busboy";
import { pipeline } from "stream/promises";
import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../models/Product.js";
import { unlink } from "fs/promises";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category", "name");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  const busboy = Busboy({ headers: req.headers });
  const fields = {};
  const files = [];

  busboy.on("field", (name, value) => {
    try {
      fields[name] =
        name === "ingredients" ? JSON.parse(value) : JSON.parse(value);
    } catch {
      fields[name] = value;
    }
  });

  busboy.on("file", (name, file, info) => {
    const { filename } = info;
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      Date.now() + "-" + filename
    );
    files.push({ name, path: filePath });
    pipeline(file, createWriteStream(filePath));
  });

  busboy.on("finish", async () => {
    try {
      const {
        name,
        category,
        productBenefits,
        methodsOfUse,
        productComposition,
        productSummary,
        ingredients,
      } = fields;
      if (!name?.en || !name?.ar || !category) {
        return res
          .status(400)
          .json({ message: "Name (en, ar) and category are required" });
      }
      const product = new Product({
        name,
        category,
        productBenefits,
        methodsOfUse,
        productComposition,
        productSummary,
        ingredients: ingredients || [],
      });
      await product.save();
      res
        .status(201)
        .json({ message: "Product created successfully", product });
    } catch (error) {
      next(error);
    }
  });

  req.pipe(busboy);
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  const busboy = Busboy({ headers: req.headers });
  const fields = {};
  const files = [];
  const imagesToDelete = [];

  busboy.on("field", (name, value) => {
    if (name === "imagesToDelete") {
      imagesToDelete.push(...JSON.parse(value));
    } else {
      try {
        fields[name] =
          name === "ingredients" ? JSON.parse(value) : JSON.parse(value);
      } catch {
        fields[name] = value;
      }
    }
  });

  busboy.on("file", (name, file, info) => {
    const { filename } = info;
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      Date.now() + "-" + filename
    );
    files.push({ name, path: filePath });
    pipeline(file, createWriteStream(filePath));
  });

  busboy.on("finish", async () => {
    try {
      const { id } = req.params;
      const {
        name,
        category,
        productBenefits,
        methodsOfUse,
        productComposition,
        productSummary,
        ingredients,
      } = fields;
      if (!name?.en || !name?.ar || !category) {
        return res
          .status(400)
          .json({ message: "Name (en, ar) and category are required" });
      }
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      // Delete old images
      for (const imagePath of imagesToDelete) {
        try {
          await unlink(path.join(__dirname, "..", imagePath));
        } catch (err) {
          console.error(`Failed to delete image ${imagePath}:`, err);
        }
      }
      product.name = name;
      product.category = category;
      product.productBenefits = productBenefits;
      product.methodsOfUse = methodsOfUse;
      product.productComposition = productComposition;
      product.productSummary = productSummary;
      product.ingredients = ingredients || [];
      await product.save();
      res.json({ message: "Product updated successfully", product });
    } catch (error) {
      next(error);
    }
  });

  req.pipe(busboy);
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Delete associated images
    for (const variant of product.variants) {
      for (const image of variant.images) {
        try {
          await unlink(path.join(__dirname, "..", image));
        } catch (err) {
          console.error(`Failed to delete image ${image}:`, err);
        }
      }
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const addVariant = async (req, res, next) => {
  const busboy = Busboy({ headers: req.headers });
  const fields = {};
  const files = [];

  busboy.on("field", (name, value) => {
    try {
      fields[name] = JSON.parse(value);
    } catch {
      fields[name] = value;
    }
  });

  busboy.on("file", (name, file, info) => {
    const { filename } = info;
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      Date.now() + "-" + filename
    );
    files.push({ name, path: filePath });
    pipeline(file, createWriteStream(filePath));
  });

  busboy.on("finish", async () => {
    console.log(req.body);
    try {
      const { id } = req.params;
      const {
        skuId,
        weight,
        title,
        price,
        priceArabic,
        currency,
        status,
        size,
      } = fields;
      if (
        !skuId ||
        !weight ||
        !title?.en ||
        !title?.ar ||
        !price ||
        !priceArabic ||
        !currency ||
        !size
      ) {
        return res
          .status(400)
          .json({ message: "All variant fields are required" });
      }
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const images = files.map((file) =>
        file.path.replace(path.join(__dirname, ".."), "")
      );
      product.variants.push({
        skuId,
        weight,
        title,
        images,
        price,
        priceArabic,
        currency,
        status,
        size,
      });
      await product.save();
      res.json({ message: "Variant added successfully", product });
    } catch (error) {
      next(error);
    }
  });

  req.pipe(busboy);
};

export const updateVariant = async (req, res, next) => {
  const busboy = Busboy({ headers: req.headers });
  const fields = {};
  const files = [];
  const imagesToDelete = [];

  busboy.on("field", (name, value) => {
    if (name === "imagesToDelete") {
      imagesToDelete.push(...JSON.parse(value));
    } else {
      try {
        fields[name] = JSON.parse(value);
      } catch {
        fields[name] = value;
      }
    }
  });

  busboy.on("file", (name, file, info) => {
    const { filename } = info;
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      Date.now() + "-" + filename
    );
    files.push({ name, path: filePath });
    pipeline(file, createWriteStream(filePath));
  });

  busboy.on("finish", async () => {
    try {
      const { id, variantId } = req.params;
      const {
        skuId,
        weight,
        title,
        price,
        priceArabic,
        currency,
        status,
        size,
      } = fields;
      if (
        !skuId ||
        !weight ||
        !title?.en ||
        !title?.ar ||
        !price ||
        !priceArabic ||
        !currency ||
        !size
      ) {
        return res
          .status(400)
          .json({ message: "All variant fields are required" });
      }
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const variant = product.variants.id(variantId);
      if (!variant) {
        return res.status(404).json({ message: "Variant not found" });
      }
      // Delete old images
      for (const imagePath of imagesToDelete) {
        try {
          await unlink(path.join(__dirname, "..", imagePath));
        } catch (err) {
          console.error(`Failed to delete image ${imagePath}:`, err);
        }
      }
      const newImages = files.map((file) =>
        file.path.replace(path.join(__dirname, ".."), "")
      );
      variant.skuId = skuId;
      variant.weight = weight;
      variant.title = title;
      variant.images = [
        ...variant.images.filter((img) => !imagesToDelete.includes(img)),
        ...newImages,
      ];
      variant.price = price;
      variant.priceArabic = priceArabic;
      variant.currency = currency;
      variant.status = status;
      variant.size = size;
      await product.save();
      res.json({ message: "Variant updated successfully", product });
    } catch (error) {
      next(error);
    }
  });

  req.pipe(busboy);
};

export const deleteVariant = async (req, res, next) => {
  try {
    const { id, variantId } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const variant = product.variants.id(variantId);
    if (!variant) {
      return res.status(404).json({ message: "Variant not found" });
    }
    // Delete variant images
    for (const image of variant.images) {
      try {
        await unlink(path.join(__dirname, "..", image));
      } catch (err) {
        console.error(`Failed to delete image ${image}:`, err);
      }
    }
    product.variants.pull(variantId);
    await product.save();
    res.json({ message: "Variant deleted successfully" });
  } catch (error) {
    next(error);
  }
};
