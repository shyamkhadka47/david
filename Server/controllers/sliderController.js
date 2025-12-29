// import fs from "fs";
// import prisma from "../config/config.js"

// class sliderController {
//   static addSlider = async (req, res) => {
//     const { title, slogan, description } = req.body;
//     const { filename } = req.file;

//     try {
//       if (!title || !slogan || !description) {
//         if (filename) {
//          try {
//            await fs.promises.unlink(`public/slider/${filename}`);
//          } catch (error) {
//           console.log(error)
//          }
//         }

//         return res
//           .status(400)
//           .json({ success: false, message: "All Fields Are required" });
//       }
//       const findslider = await slidermodal.find();

//       if (findslider.length > 9) {
//         if (filename) {
//         try {
//             await fs.promises.unlink(`public/slider/${filename}`);
//         } catch (error) {
//           console.log(error.message)
//         }
//         }

//         return res
//           .status(400)
//           .json({ success: false, message: "Max 3 Sliders Can be Uploaded" });
//       }

//       const saveslider = await slidermodal.create({
//         title,
//         slogan,
//         description,
//         sliderimage: filename,
//       });
//       if (!saveslider) {
//         if (filename) {
//           try {
//               await fs.promises.unlink(`public/slider/${filename}`);
//           } catch (error) {
//             console.log(error.message)
//           }
//           }
//         return res
//           .status(400)
//           .json({ success: false, message: "New Slider Not Created" });
//       }
//       return res
//         .status(200)
//         .json({ success: true, message: "Slider Created SuccessFully" });
//     } catch (error) {
//       if(filename){
//         try {
//           await fs.promises.unlink(`public/slider/${filename}`)
//         } catch (error) {

//         }
//       }
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error Please Try again",
//       });
//     }
//   };

//   static getSlider = async (req, res) => {
//     try {
//       const findslider = await slidermodal.find().sort({ createdAt: -1 });
//       if (!findslider) {
//         return res
//           .status(400)
//           .json({ success: false, message: "No Slider Found" });
//       }

//       return res.status(200).json({ success: true, data: findslider });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error Please Try Again",
//       });
//     }
//   };

//   static deleteSlider = async (req, res) => {
//     const { id } = req.params;

//     try {
//       if (!id) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Id Required to Delete" });
//       }
//       const findslider = await slidermodal.findOne({ id: id });
//       if (!findslider) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Slider Not Found" });
//       }
//       fs.unlink(`public/slider/${findslider.sliderimage}`, (err) => {
//         if (err) {
//           console.log(err);
//         }
//       });
//       const data = await slidermodal.findByIdAndDelete(id);
//       if (!data) {
//         return res
//           .status(400)
//           .json({
//             success: false,
//             message: "Error Deleting Slider Please Try Again",
//           });
//       }
//       return res
//         .status(200)
//         .json({ success: true, message: "Slider Deleted SuccessFully" });
//     } catch (error) {
//       return res
//         .status(500)
//         .json({
//           success: false,
//           message: "Internal Server Error Please Try Again",
//         });
//     }
//   };

//   static singleSlider = async (req, res) => {
//     const { id } = req.params;
//     try {
//       if (!id) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Id Required to edit Slider" });
//       }
//       const findslider = await slidermodal.findOne({ id: id });
//       if (!findslider) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Slider Not Found" });
//       }
//       return res.status(200).json({ success: true, data: findslider });
//     } catch (error) {
//       return res
//         .status(500)
//         .json({
//           success: false,
//           message: "Internal Server Error Please Try Again",
//         });
//     }
//   };

//   static updateSlider = async (req, res) => {
//     const { title, slogan, description } = req.body;
//     const { filename } = req.file;
//     const { id } = req.params;

//     try {
//       const findslider = await slidermodal.findById(id);

//       if (!findslider) {
//         if(filename){
//           try {
//             await fs.promises.unlink(`public/slider/${filename}`)
//           } catch (error) {
//             console.log(error)
//           }
//         }
//         return res
//           .status(400)
//           .json({ success: false, message: "Slider Not Found" });
//       }

//       const updatedslider = await slidermodal.findByIdAndUpdate(id, {
//         title,
//         slogan,
//         description,
//         sliderimage: filename,
//       });
//       if (!updatedslider) {
//         if(filename){
//           try {
//             await fs.promises.unlink(`public/slider/${filename}`)
//           } catch (error) {
//             console.log(error)
//           }
//         }
//         return res
//           .status(400)
//           .json({ success: false, message: "Error Updating Slider" });
//       }
//       if (filename) {
//         try {
//           await fs.promises.unlink(`public/slider/${findslider.sliderimage}`);
//         } catch (error) {
//          console.log(error)
//         }
//       }
//       return res
//         .status(200)
//         .json({ success: true, message: "Slider Updated successfully" });
//     } catch (error) {
//       if (filename) {
//         try {
//           await fs.promises.unlink(`public/slider/${filename}`);
//         } catch (error) {
//          console.log(error)
//         }
//       }
//       return res
//         .status(500)
//         .json({
//           success: false,
//           message: "Internal Server Error Please Try Again",
//         });
//     }
//   };
// }

// export default sliderController;
