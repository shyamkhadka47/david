import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import connect from "./config/config.js";
import Router from "./routes/userRoutes.js";
// import multer from "multer";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
app.use(cors());

app.use(express.static("public/uploads")); 
app.use(express.static("public/slider"));
app.use(express.static("public/service"))
app.use(express.static("public/testimonial"))
app.use(express.static("public/gallery"))
app.use(express.static("public/about"))
app.use(express.static("public/bannervideos"))
app.use(express.static("public/storytellers"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", Router);
// connect().then(() => {
//   app.listen(port, () => {
//     console.log(`App running on port ${port}`);
//   });
// });
app.listen(port, ()=>{
  console.log(`App Running on port ${port}`)
})
