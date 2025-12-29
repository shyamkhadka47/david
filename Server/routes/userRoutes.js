import express from "express";
import authController from "../controllers/authController.js";
import protect from "../middleware/authCheck.js";
import siteSettingController from "../controllers/siteSettingController.js";
import {
  aboutupload,
  bannerupload,
  galleryupload,
  logoupload,
  serviceupload,
  sliderupload,
  storytellerupload,
  testimonialupload,
} from "../multerStorage/multer-config.js";

// import sliderController from "../controllers/sliderController.js";
// import userqueryController from "../controllers/userqueryController.js";
// import serviceController from "../controllers/serviceController.js";
// import testimonialController from "../controllers/testimonialController.js";
// import galleryController from "../controllers/galleryController.js";
import aboutController from "../controllers/aboutController.js";
import metacontroller from "../controllers/metaController.js";
import videoController from "../controllers/videoController.js";
// import categoryController from "../controllers/categoryController.js";
import BannerVideoController from "../controllers/bannerVideoController.js";
import StorytellerController from "../controllers/StorytellerController.js";

const Router = express.Router();

// Authorization
Router.post("/login", authController.userLogin);
Router.post("/register", authController.userRegister);
Router.delete("/deleteuser", protect, authController.deleteUser)
Router.post("/me", protect, authController.isVerified);

//  Site Settings API
Router.get("/sitesettings", siteSettingController.getSiteSetting);
Router.post(
  "/addsitesettings",
  protect,
  logoupload.single("image"),
  siteSettingController.addSiteSetting
);
Router.put(
  "/editsitesettings",
  protect,
  logoupload.single("image"),
  siteSettingController.editSiteSetting
);

// // FAQ API
// // Router.post("/addfaq", protect, faqController.addNewFaq);
// // Router.get("/getfaq", faqController.getAllFaq);
// // Router.get("/getfaq/:id", protect, faqController.getSingleFaq);
// // Router.put("/updatefaq/:id", protect, faqController.updateFaq);
// // Router.delete("/deletefaq/:id", protect, faqController.deleteFaq);

// META DATA API
Router.post("/addmetadata", protect, metacontroller.addmetadata);
Router.get("/getallmetadata", metacontroller.getallmetadata);
Router.get("/getsinglemetadata/:id", metacontroller.getsinglemetadata);
Router.put("/updatemetadata/:id", protect, metacontroller.updatemetadata);
Router.delete("/deletemetadata/:id", metacontroller.deletemetadata);

// // SLIDER API
// Router.post(
//   "/addnewslider",
//   protect,
//   sliderupload.single("image"),
//   sliderController.addSlider
// );
// Router.get("/getallslider", sliderController.getSlider);
// Router.get("/getsingleslider/:id", protect, sliderController.singleSlider);
// Router.delete("/deleteslider/:id", protect, sliderController.deleteSlider);
// Router.put(
//   "/updateslider/:id",
//   protect,
//   sliderupload.single("image"),
//   sliderController.updateSlider
// );

// // USER QUERY API
// Router.post("/adduserquery", userqueryController.addquery);
// Router.get("/getalluserquery", protect, userqueryController.getAllUserQuery);
// Router.get(
//   "/getsingleuserquery/:id",
//   protect,
//   userqueryController.getSingleUserQuery
// );
// Router.delete(
//   "/deleteuserquery/:id",
//   protect,
//   userqueryController.deleteUserQuery
// );

// // OUR SERVICES API

// Router.post(
//   "/addnewservices",
//   protect,
//   serviceupload.single("image"),
//   serviceController.addNewServices
// );
// Router.get("/getallservices", serviceController.getAllServices);
// Router.get(
//   "/getsingleservice/:id",
//   protect,
//   serviceController.getSingleService
// );
// Router.put(
//   "/updateservice/:id",
//   protect,
//   serviceupload.single("image"),
//   serviceController.updateService
// );
// Router.delete("/deleteservice/:id", protect, serviceController.deleteService);

// // CUSTOMERS TESTIMONIAL API
// Router.post(
//   "/addtestimonials",
//   protect,
//   testimonialupload.single("image"),
//   testimonialController.addTestimonial
// );
// Router.get(
//   "/getalltestimonial",
//   protect,
//   testimonialController.getAllTestimonial
// );
// Router.get(
//   "/getsingletestimonial/:id",
//   protect,
//   testimonialController.getSingleTestimonial
// );
// Router.put(
//   "/updatetestimonial/:id",
//   protect,
//   testimonialupload.single("image"),
//   testimonialController.updateTestimonial
// );
// Router.delete(
//   "/deletetestimonial/:id",
//   protect,
//   testimonialController.deleteTestimonial
// );

// // GALLERY CATEGORY
// Router.post('/addnewcategory',protect,   categoryController.createCategory);
// Router.get('/getallcategories',     categoryController.getAllCategories);
// Router.get('/getcategorybyid/:id',  categoryController.getCategoryById);
// Router.put('/updatecategory/:id',protect,  categoryController.updateCategory);
// Router.delete('/deletecategory/:id', protect, categoryController.deleteCategory);


// // GALLERY API
// Router.post(
//   "/addgallery",
//   protect,
//   galleryupload.single("image"),
//   galleryController.addNewGallery
// );
// Router.get("/getallgallery", galleryController.getAllGallery);
// Router.get("/getrandomgallery", galleryController.getRandomGallery)
// Router.get(
//   "/getsinglegallery/:id",
//   protect,
//   galleryController.getSingleGallery
// );
// Router.put(
//   "/updategallery/:id",
//   protect,
//   galleryupload.single("image"),
//   galleryController.updateGallery
// );
// Router.delete("/deletegallery/:id", protect, galleryController.deleteGallery);

// ABOUT US API
Router.post(
  "/addaboutus",
  protect,
  aboutupload.single("image"),
  aboutController.addAboutUs
);
Router.get("/getaboutus", aboutController.getAboutUs);
Router.put(
  "/updateaboutus",
  protect,
  aboutupload.single("image"),
  aboutController.updateAboutUs
);

//  PAGE BANNER VIDEOS
Router.get("/getallbannervideos", BannerVideoController.getAllBannerVideos)
Router.post("/addbannervideo", protect, bannerupload.single("videoFile"),BannerVideoController.addBannerVideo  )
Router.get("/getsinglebannervideo/:id", BannerVideoController.getSingleBannerVideo)
Router.put("/updatebannervideo/:id", protect, bannerupload.single("videoFile"), BannerVideoController.updateBannerVideo)
Router.delete("/deletebannervideo/:id", protect, BannerVideoController.deleteBannerVideo)

// VIDEO ROUTES 
Router.get("/getallvideo", videoController.getallvideos);
Router.post("/addvideo", protect, videoController.addVideo);
Router.get("/singlevideo/:id", videoController.getsinglevideo);
Router.put("/updatevideo/:id", protect, videoController.editvideo);
Router.delete("/deletevideo/:id", protect, videoController.deletevideo);

// STORY TELLER ROUTES
Router.post("/addnewstory", protect,storytellerupload.single("image"), StorytellerController.addnewstory)
Router.get("/getallstories", StorytellerController.getallstories)
Router.get("/getsinglestory/:slug", StorytellerController.getsinglestory)
Router.put("/updatestory/:slug", protect, storytellerupload.single("image"), StorytellerController.updatestory)
Router.delete("/deletestory/:slug", protect, StorytellerController.deletestory)

export default Router;
