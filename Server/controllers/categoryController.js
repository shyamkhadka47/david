import prisma from "../config/config.js";
class categoryController {
  // Create new category
  static createCategory = async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    try {
      const category = await prisma.category.create({ data: { name } });
      return res
        .status(200)
        .json({ success: true, message: "Category Added Successfully" });
    } catch (error) {
      console.error("Create Category Error:", error);
      if (error.code == "P2002") {
        return res
          .status(400)
          .json({ success: false, message: "Another Category already exists " });
      }
      return res.status(500).json({
        success: false,
        message: "Internal Server Error. Please try again.",
      });
    }
  };

  // Get all categories
  static getAllCategories = async (req, res) => {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json({ success: true, data: categories });
    } catch (error) {
      console.error("Get All Categories Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error. Please try again.",
      });
    }
  };

  // Get a category by ID
  static getCategoryById = async (req, res) => {
    const { id } = req.params;
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 20;

    try {
      const category = await prisma.category.findUnique({ where: { id } });

      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      return res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      console.error("Get Category By ID Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error. Please try again.",
      });
    }
  };

  //   Get Category wise Gallery
  static getGalleriesByCategoriesId = async (req, res) => {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    if (!id) {
      return res.status(400).json({ success: false, message: "Invalid Id " });
    }
    try {
      const findgalleries = await prisma.gallery.findMany({
        where: { categoryId: id },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      });
      const total = await prisma.gallery.count({
        where: { categoryId: id },
      });

      return res.status(200).json({
        success: true,
        data: findgalleries,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again Later",
      });
    }
  };

  // Delete a category
  static deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
      const category = await prisma.category.findUnique({ where: { id } });
      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      const galleries = await prisma.gallery.findMany({
        where: { categoryId: id },
      });

      if (galleries.length > 0) {
        return res.status(400).json({
          success: false,
          message:
            "Cannot delete category with associated galleries. Delete them first.",
        });
      }

      await prisma.category.delete({ where: { id } });
      return res
        .status(200)
        .json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
      console.error("Delete Category Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error. Please try again.",
      });
    }
  };

  // Update a category
  static updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "name is required" });
    }

    try {
      await prisma.category.update({ where: { id }, data: { name } });

      return res.status(200).json({
        success: true,

        message: "Category updated successfully",
      });
    } catch (error) {
      console.error("Update Category Error:", error);
      if (error.code == "P2002") {
        return res.status(400).json({
          success: false,
          message: "Another category with this name already exists",
        });
      }
      if (error.code == "P2025") {
        return res.status(400).json({
          success: false,
          message: "Category Name doesn't exist",
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal Server Error. Please try again.",
      });
    }
  };
}

export default categoryController;
