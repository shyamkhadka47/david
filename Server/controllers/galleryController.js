import fs from "fs";
import prisma from "../config/config.js";

class galleryController {
  // Centralized image deletion
  static deleteImage = async (filename) => {
    try {
      await fs.promises.unlink(`public/gallery/${filename}`);
    } catch (err) {
      console.error("Failed to delete image:", filename, err.message);
    }
  };

  static addNewGallery = async (req, res) => {
    const { description, caption, categoryId } = req.body;
    const { filename } = req.file || {};

    // Validate inputs
    if (!description || !caption || !categoryId || !filename) {
      if (filename) await galleryController.deleteImage(filename);
      return res.status(400).json({
        success: false,
        message: "Description, Caption, CategoryId and Image are all required",
      });
    }

    try {
      // Ensure category exists
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!category) {
        await galleryController.deleteImage(filename);
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      // Create gallery
      const savegallery = await prisma.gallery.create({
        data: {
          description,
          caption,
          galleryImage: filename,
          categoryId,
        },
      });

      return res
        .status(200)
        .json({ success: true, message: "Gallery Created Successfully" });
    } catch (error) {
      // Cleanup on error
      if (filename) await galleryController.deleteImage(filename);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };

  static getRandomGallery = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    try {
      const findallgallery = await gallerymodal.aggregate([
        { $sample: { size: limit } },
      ]);
      return res.status(200).json({ success: true, data: findallgallery });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };

  static getAllGallery = async (req, res) => {
    try {
      // Get page and limit from query params, set default values
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Calculate how many documents to skip
      const skip = (page - 1) * limit;

      // Query gallery with pagination
      const findgallery = await prisma.gallery.findMany({
        take: limit,
        skip,
        orderBy: { createdAt: "desc" },
        include: { Category: true },
      });

      // If no gallery entries found
      //   if (!findgallery || findgallery.length === 0) {
      //     return res.status(400).json({
      //       success: false,
      //       message: "There Are No Gallery Entries In Database",
      //     });
      //   }

      // Get total number of gallery documents for pagination metadata
      const total = await prisma.gallery.count();

      // Return paginated results with metadata
      return res.status(200).json({
        success: true,
        data: findgallery,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };

  static getSingleGallery = async (req, res) => {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Id Required. Please Choose Valid Id.",
        });
      }

      const getsinglegallery = await prisma.gallery.findUnique({
        where: { id },
      });
      if (!getsinglegallery) {
        return res.status(404).json({
          success: false,
          message: "Gallery not found",
        });
      }

      return res.status(200).json({ success: true, data: getsinglegallery });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };

  static updateGallery = async (req, res) => {
    const { id } = req.params;
    const { description, caption, categoryId } = req.body;
    const { filename } = req.file || {};

    if (!id) {
      if (filename) await galleryController.deleteImage(filename);
      return res.status(400).json({
        success: false,
        message: "Id Required. Please Choose Valid Id.",
      });
    }
    const findcategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!findcategory) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Valid Category" });
    }
    try {
      const findgallery = await prisma.gallery.findUnique({ where: { id } });
      if (!findgallery) {
        return res
          .status(400)
          .json({ success: false, message: "Image Not found" });
      }
      const updatingdata = {
        description,
        caption,
        categoryId,
      };
      if (filename) {
        updatingdata.galleryImage = filename;
      }
      const updategallery = await prisma.gallery.update({
        where: { id },
        data: updatingdata,
      });

      if (filename && findgallery.galleryImage) {
        await galleryController.deleteImage(findgallery.galleryImage);
      }
      return res
        .status(200)
        .json({ success: true, message: "Gallery updated Successfully" });
    } catch (error) {
      if (error.code == "P2025") {
        return res
          .status(400)
          .json({ success: false, message: "Gallery Not Found" });
      }
      if (filename) await galleryController.deleteImage(filename);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };

  static deleteGallery = async (req, res) => {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Id Required. Please Choose Valid Id.",
        });
      }

      const findgallery = await prisma.gallery.delete({ where: { id } });
      console.log(findgallery);

      // finally delete file
      await galleryController.deleteImage(findgallery.galleryImage);

      return res
        .status(200)
        .json({ success: true, message: "Gallery Deleted Successfully" });
    } catch (error) {
      console.log("====== FULL ERROR DETAILS ======");
      console.log("Error code:", error.code); // Should be undefined
      console.log("Error message:", error.message); // The real error
      console.log("Error stack:", error.stack); // Where it happened
      console.log("==============================");

      if (error.code == "P2025") {
        return res
          .status(400)
          .json({ success: false, message: "Image not Found" });
      }
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };
}

export default galleryController;
