// import categoryModel from "../models/categorymodel.js";
// import galleryModel from "../models/gallerymodel.js";

// class categoryController {
//   // Create new category
//   static createCategory = async (req, res) => {
//     const { name } = req.body;

//     if (!name) {
//       return res.status(400).json({ success: false, message: "Name is required" });
//     }

//     try {
//       const existing = await categoryModel.findOne({ name });
//       if (existing) {
//         return res.status(400).json({ success: false, message: "Category already exists" });
//       }

//       const category = await categoryModel.create({ name });
//       return res.status(200).json({ success: true, message:"Category Added Successfully"});
//     } catch (error) {
//       console.error("Create Category Error:", error);
//       return res.status(500).json({ success: false, message: "Internal Server Error. Please try again." });
//     }
//   };

//   // Get all categories
//   static getAllCategories = async (req, res) => {
//     try {
//       const categories = await categoryModel.find().sort({createdAt:-1});
//       return res.status(200).json({ success: true, data: categories });
//     } catch (error) {
//       console.error("Get All Categories Error:", error);
//       return res.status(500).json({ success: false, message: "Internal Server Error. Please try again." });
//     }
//   };

//   // Get a category by ID
//   static getCategoryById = async (req, res) => {
//     const { id } = req.params;
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 20;

//     try {
//       const category = await categoryModel.findById(id).populate("galleries");

//       if (!category) {
//         return res.status(404).json({ success: false, message: "Category not found" });
//       }

//       const total = category.galleries.length;
//       const startIndex = (page - 1) * limit;
//       const endIndex = startIndex + limit;

//       // Paginate galleries manually
//       const paginatedGalleries = category.galleries.slice(startIndex, endIndex);

//       return res.status(200).json({
//         success: true,
//         data: paginatedGalleries,
//         total,
//         page,
//         totalPages: Math.ceil(total / limit),
//       });
//     } catch (error) {
//       console.error("Get Category By ID Error:", error);
//       return res.status(500).json({ success: false, message: "Internal Server Error. Please try again." });
//     }
//   };

//   // Delete a category
//   static deleteCategory = async (req, res) => {
//     const { id } = req.params;
//     try {
//       const category = await categoryModel.findById(id);
//       if (!category) {
//         return res.status(404).json({ success: false, message: "Category not found" });
//       }

//       const galleries = await galleryModel.find({ category: id });

//       if (galleries.length > 0) {
//         return res.status(400).json({
//           success: false,
//           message: "Cannot delete category with associated galleries. Delete them first.",
//         });
//       }

//       await categoryModel.findByIdAndDelete(id);
//       return res.status(200).json({ success: true, message: "Category deleted successfully" });
//     } catch (error) {
//       console.error("Delete Category Error:", error);
//       return res.status(500).json({ success: false, message: "Internal Server Error. Please try again." });
//     }
//   };

//   // Update a category
//   static updateCategory = async (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;

//     if (!name) {
//       return res.status(400).json({ success: false, message: "name is required" });
//     }

//     try {
//       const category = await categoryModel.findById(id);
//       if (!category) {
//         return res.status(404).json({ success: false, message: "Category not found" });
//       }

//       // Check if new name already exists (and is not the current category)
//       const duplicate = await categoryModel.findOne({ name });
//       if (duplicate && duplicate.id.toString() !== id) {
//         return res.status(400).json({ success: false, message: "Another category with this name already exists" });
//       }

//       category.name = name;
//       await category.save();

//       return res.status(200).json({ success: true, data: category, message: "Category updated successfully" });
//     } catch (error) {
//       console.error("Update Category Error:", error);
//       return res.status(500).json({ success: false, message: "Internal Server Error. Please try again." });
//     }
//   };
// }

// export default categoryController;
