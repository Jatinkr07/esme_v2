import Category from "../models/Category.js";

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name?.en || !name?.ar) {
      return res
        .status(400)
        .json({ message: "English and Arabic names are required" });
    }
    const category = new Category({ name });
    await category.save();
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name?.en || !name?.ar) {
      return res
        .status(400)
        .json({ message: "English and Arabic names are required" });
    }
    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category updated successfully", category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};
