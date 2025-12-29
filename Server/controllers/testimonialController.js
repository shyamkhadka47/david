
// import testimonialmodal from "../models/testimonialmodel.js";

// import fs from "fs";
// class testimonialController {
//   static addTestimonial = async (req, res) => {
//     const { name, title, description } = req.body;
//     const { filename } = req.file;
//     try {
//       if (!name || !title || !description) {
//         if (filename) {
//           try {
//             await fs.promises.unlink(`public/testimonial/${filename}`);
//           } catch (error) {
//             console.log(error);
//           }
//         }
//         return res
//           .status(400)
//           .json({ success: false, message: "All Fields Required" });
//       }

//       const savetestimonial = await testimonialmodal.create({
//         name,
//         title,
//         description,
//         testimonialImage: filename,
//       });
//       if (!savetestimonial) {
//         if (filename) {
//           try {
//             await fs.promises.unlink(`public/testimonial/${filename}`);
//           } catch (error) {
//             console.log(error);
//           }
//         }
//         return res.status(400).json({
//           success: true,
//           message: "Error Saving Testimonial Please Try Again",
//         });
//       }
//       return res
//         .status(200)
//         .json({ success: true, message: "Testimonial Created Successfully" });
//     } catch (error) {
//       if (filename) {
//         try {
//           await fs.promises.unlink(`public/testimonial/${filename}`);
//         } catch (error) {
//           console.log(error);
//         }
//       }
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error Please Try Again",
//       });
//     }
//   };

//   static getAllTestimonial = async (req, res) => {
//     try {
//       const findtestimonial = await testimonialmodal
//         .find()
//         .sort({ createdAt: -1 });
//       if (!findtestimonial) {
//         return res.status(400).json({
//           success: false,
//           message: "No Testimonial Available",
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         data: findtestimonial,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error Please Try Again",
//       });
//     }
//   };
//   static getSingleTestimonial = async (req, res) => {
//     const { id } = req.params;
//     try {
//       if (!id) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Please Choose Valid Testimonial" });
//       }
//       const findtestimonial = await testimonialmodal.findById(id);
//       if (!findtestimonial) {
//         return res
//           .status(400)
//           .json({ success: false, message: "No Such Testimonial Available" });
//       }
//       return res.status(200).json({ success: true, data: findtestimonial });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error Please Try Again",
//       });
//     }
//   };
//   static updateTestimonial = async (req, res) => {
//     const { name, title, description } = req.body;
//     const { filename } = req.file;
//     const { id } = req.params;
//     try {
//       if (!id) {
//         return res
//         .status(400)
//         .json({ success: false, message: "Please Choose Valid Testimonial" });
//       }
      
//       const findtestimonial = await testimonialmodal.findById(id);
//       if (!findtestimonial) {
//         if (filename) {
//           fs.unlink(`public/testimonial/${filename}`, (err) => {
//             if (err) {
//               console.log(err);
//             }
//           });
//         }
//         return res
//         .status(400)
//         .json({ success: false, message: "No Such Testimonial Exist" });
//       }
      
//       const updatetestimonial = await testimonialmodal.findByIdAndUpdate(id, {
//         name,
//         title,
//         description,
//         testimonialImage: filename,
//       });
    
//       if (!updatetestimonial) {
//         if (filename) {
//           try {
//             await fs.promises.unlink(`public/testimonial/${filename}`);
//           } catch (error) {
//             console.log(error);
//           }
//         }
//         return res
//           .status(400)
//           .json({ success: false, message: "Error Updating Testimonial" });
//       }
//       try {
//         await fs.promises.unlink(
//           `public/testimonial/${findtestimonial.testimonialImage}`
//         );
//       } catch (error) {
//         console.log(error)
//       }
//       return res
//         .status(200)
//         .json({ success: true, message: "Testimonial Updated SuccessFully" });
//     } catch (error) {
//       if (filename) {
//         try {
//           await fs.promises.unlink(`public/testimonial/${filename}`);
//         } catch (error) {
//           console.log(error);
//         }
//       }
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error Please Try Again",
//       });
//     }
//   };
//   static deleteTestimonial = async (req, res) => {
//     const { id } = req.params;
//     try {
//       if (!id) {
//         return res.status(400).json({
//           success: false,
//           message: "Please Choose Valid Testimonial To Delete",
//         });
//       }
//       const foundtestimonial = await testimonialmodal.findById(id);
//       if (!foundtestimonial) {
//         return res
//           .status(400)
//           .json({ success: false, message: "No Such testimonial Available" });
//       }

//       const findtestimonial = await testimonialmodal.findByIdAndDelete(id);
//       if (!findtestimonial) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Error Deleting testimonial" });
//       }

//       try {
//         await fs.promises.unlink(
//           `public/testimonial/${foundtestimonial.testimonialImage}`
//         );
//       } catch (error) {
//         console.log(err);
//       }

//       return res
//         .status(200)
//         .json({ success: true, message: "testimonial Deleted Successfully" });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error Please Try Again",
//       });
//     }
//   };
// }
// export default testimonialController;
