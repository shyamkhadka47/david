// import fs from "fs";
// import gallerymodal from "../models/gallerymodel.js";
// import categorymodal from "../models/categorymodel.js";

// class galleryController {
//   // Centralized image deletion
//   static deleteImage = async (filename) => {
//     try {
//       await fs.promises.unlink(`public/gallery/${filename}`);
//     } catch (err) {
//       console.error("Failed to delete image:", filename, err.message);
//     }
//   };

//   static addNewGallery = async (req, res) => {
//     const { description, caption, categoryId } = req.body;
//     const { filename } = req.file || {};

//     // Validate inputs
//     if (!description || !caption || !categoryId || !filename) {
//       if (filename) await galleryController.deleteImage(filename);
//       return res.status(400).json({
//         success: false,
//         message: "Description, Caption, CategoryId and Image are all required",
//       });
//     }

//     try {
//       // Ensure category exists
//       const category = await categorymodal.findById(categoryId);
//       if (!category) {
//         await galleryController.deleteImage(filename);
//         return res.status(404).json({ success: false, message: "Category not found" });
//       }

//       // Create gallery
//       const savegallery = await gallerymodal.create({
//         description,
//         caption,
//         galleryImage: filename,
//         category: categoryId,
//       });

//       // Link into category
//       category.galleries.push(savegallery.id);
//       await category.save();

//       return res
//         .status(200)
//         .json({ success: true, message: "Gallery Created Successfully" });
//     } catch (error) {
//       // Cleanup on error
//       if (filename) await galleryController.deleteImage(filename);
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error Please Try Again",
//       });
//     }
//   };

//   static getRandomGallery= async(req, res)=>{

//     const limit = parseInt(req.query.limit) || 10
//     try {
//       const findallgallery= await gallerymodal.aggregate([{$sample:{size:limit}}])
//      return res.status(200).json({success:true, data:findallgallery})
//     } catch (error) {
//       return res.status(500).json({success:false, message:"Internal Server Error Please Try Again"})
//     }

//   }

//   static getAllGallery = async (req, res) => {
//     try {
//       // Get page and limit from query params, set default values
//       const page = parseInt(req.query.page) || 1;
//       const limit = parseInt(req.query.limit) || 10;

//       // Calculate how many documents to skip
//       const skip = (page - 1) * limit;

//       // Query gallery with pagination
//       const findgallery = await gallerymodal
//         .find()
//         .populate("category", "-galleries")
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit).lean();

//       // If no gallery entries found
//       if (!findgallery || findgallery.length === 0) {
//         return res.status(400).json({
//           success: false,
//           message: "There Are No Gallery Entries In Database",
//         });
//       }

//       // Get total number of gallery documents for pagination metadata
//       const total = await gallerymodal.countDocuments();

//       // Return paginated results with metadata
//       return res.status(200).json({
//         success: true,
//         data: findgallery,
//         total,
//         page,
//         totalPages: Math.ceil(total / limit),
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error Please Try Again",
//       });
//     }
//   };

//   static getSingleGallery = async (req, res) => {
//     const { id } = req.params;
//     try {
//       if (!id) {
//         return res.status(400).json({
//           success: false,
//           message: "Id Required. Please Choose Valid Id.",
//         });
//       }

//       const getsinglegallery = await gallerymodal
//         .findById(id)
//         .populate("category");

//       if (!getsinglegallery) {
//         return res
//           .status(400)
//           .json({ success: false, message: "No Such Gallery Available" });
//       }

//       return res.status(200).json({ success: true, data: getsinglegallery });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error Please Try Again",
//       });
//     }
//   };

//   static updateGallery = async (req, res) => {
//     const { id } = req.params;
//     const { description, caption, categoryId } = req.body;
//     const { filename } = req.file || {};

//     if (!id) {
//       if (filename) await galleryController.deleteImage(filename);
//       return res.status(400).json({
//         success: false,
//         message: "Id Required. Please Choose Valid Id.",
//       });
//     }

//     try {
//       const findgallery = await gallerymodal.findById(id);
//       if (!findgallery) {
//         if (filename) await galleryController.deleteImage(filename);
//         return res
//           .status(400)
//           .json({ success: false, message: "No Such Gallery Found" });
//       }

//       // Handle category change
//       if (categoryId && categoryId !== findgallery.category.toString()) {
//         const oldCat = await categorymodal.findById(findgallery.category);
//         const newCat = await categorymodal.findById(categoryId);
//         if (!newCat) {
//           if (filename) await galleryController.deleteImage(filename);
//           return res
//             .status(404)
//             .json({ success: false, message: "New Category Not Found" });
//         }
//         // unlink from old
//         if (oldCat) {
//           oldCat.galleries.pull(findgallery.id);
//           await oldCat.save();
//         }
//         // link to new
//         newCat.galleries.push(findgallery.id);
//         await newCat.save();
//         findgallery.category = categoryId;
//       }

//       // Handle image replacement
//       if (filename) {
//         const oldImage = findgallery.galleryImage;
//         findgallery.galleryImage = filename;
//         // save change before deleting old file
//         await findgallery.save();
//         await galleryController.deleteImage(oldImage);
//       }

//       // Update text fields
//       if (description) findgallery.description = description;
//       if (caption) findgallery.caption = caption;

//       await findgallery.save();

//       return res
//         .status(200)
//         .json({ success: true, message: "Gallery updated Successfully" });
//     } catch (error) {
//       // cleanup new file on error
//       if (filename) await galleryController.deleteImage(filename);
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error Please Try Again",
//       });
//     }
//   };

//   static deleteGallery = async (req, res) => {
//     const { id } = req.params;
//     try {
//       if (!id) {
//         return res.status(400).json({
//           success: false,
//           message: "Id Required. Please Choose Valid Id.",
//         });
//       }

//       const findgallery = await gallerymodal.findById(id);
//       if (!findgallery) {
//         return res
//           .status(400)
//           .json({ success: false, message: "No Such Gallery Found" });
//       }

//       // remove from category
//       const category = await categorymodal.findById(findgallery.category);
//       if (category) {
//         category.galleries.pull(findgallery.id);
//         await category.save();
//       }

//       // delete record
//       const deletegallery = await gallerymodal.findByIdAndDelete(id);
//       if (!deletegallery) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Error Deleting Gallery" });
//       }

//       // finally delete file
//       await galleryController.deleteImage(findgallery.galleryImage);

//       return res
//         .status(200)
//         .json({ success: true, message: "Gallery Deleted Successfully" });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error Please Try Again",
//       });
//     }
//   };
// }

// export default galleryController;
