// import userquerymodal from "../models/contactmodel.js";

// class userqueryController {
//   static addquery = async (req, res) => {
//     const { name, email, phonenumber, description } = req.body;
//     try {
//       if (!name || !email || !phonenumber || !description) {
//         return res
//           .status(400)
//           .json({ success: false, message: "All Field Are Required" });
//       }

//       const savequery = await userquerymodal.create({
//         name,
//         email,
//         phonenumber,
//         description,
//       });

//       if (!savequery) {
//         return res.status(400).json({
//           success: false,
//           message: "Error Saving Your Query Please Try Again",
//         });
//       }

//       return res
//         .status(200)
//         .json({ success: true, message: "We Will Contact you Soon" });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error Please Try Again",
//       });
//     }
//   };

//   static getAllUserQuery = async (req, res) => {
//     try {
//       const findquery = await userquerymodal.find().sort({ createdAt: -1 });
//       if (!findquery) {
//         return res
//           .status(400)
//           .json({ success: false, message: "No Queries Found" });
//       }
//       return res.status(200).json({
//         success: true,
//         message: "All User Queries List",
//         data: findquery,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error Please Try Again",
//       });
//     }
//   };

//   static getSingleUserQuery = async (req, res) => {
//     try {
//       const { id } = req.params;
//       if (!id) {
//         return res.status(400).json({
//           success: false,
//           message: "Id Required to View Single User Query",
//         });
//       }
//       const finduserquery = await userquerymodal.findById(id);
//       if (!finduserquery) {
//         return res
//           .status(400)
//           .json({ success: false, message: "User Query dont Exist" });
//       }

//       return res.status(200).json({ success: true, data: finduserquery });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error Please Try Again Later",
//       });
//     }
//   };
//   static deleteUserQuery = async (req, res) => {
//     const { id } = req.params;
//     try {
//       if (!id) {
//         return res
//           .status(400)
//           .json({
//             success: false,
//             message: "Id Required to Delete User Query",
//           });
//       }
//       const finduserquery = await userquerymodal.findByIdAndDelete(id);
//       if (!finduserquery) {
//         return res
//           .status(400)
//           .json({ success: false, message: "User Query Dont Exist" });
//       }

//       return res
//         .status(200)
//         .json({ success: true, message: "Query Deleted Successfully" });
//     } catch (error) {
//       return res
//         .status(500)
//         .json({
//           success: false,
//           message: "Internal Server Error Please Try Again",
//         });
//     }
//   };
// }

// export default userqueryController;
