import fs from "fs";
import prisma from "../config/config.js";

class aboutController {
  static async revalidate(tag, path) {
    const res = await fetch(`${process.env.FRONTEND_URL}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tag ? { tag } : { path }),
    });
  }
  static async deleteImage(filename) {
    if (!Array.isArray(filename) || filename.length == 0) {
      return;
    }
    try {
      for (let index = 0; index < filename.length; index++) {
        await fs.promises.unlink(`public/about/${filename[index]}`);
      }
    } catch (error) {
      return console.log(error);
    }
  }

  static addAboutUs = async (req, res) => {
    const { title, content, shortContent } = req.body;
    const files =
      req?.files && req?.files.length > 0
        ? req.files.map((el) => el.filename)
        : [];

    if (files.length == 0) {
      return res
        .status(400)
        .json({ success: false, message: "Image Required Less Than 1 MB" });
    }
    if (req?.files.length > 0) {
      for (let index = 0; index < req.files.length; index++) {
        if (req?.files[index].size > 1 * 1024 * 1024) {
          await aboutController.deleteImage(files);
          return res.status(400).json({
            success: false,
            message: `${req.files[index].originalname} is more than 1 MB`,
          });
        }
      }
    }

    if (req.fileValidationError) {
      await aboutController.deleteImage(files);
      return res
        .status(400)
        .json({ success: false, message: req.fileValidationError });
    }
    if (!title || !content || !shortContent) {
      if (files) {
        await aboutController.deleteImage(files);
      }
      return res
        .status(400)
        .json({ success: false, message: "All Field Required" });
    }
    try {
      const findabout = await prisma.aboutUs.findMany();

      if (findabout.length > 0) {
        await aboutController.deleteImage(files);
        return res
          .status(400)
          .json({ success: false, message: "About Us Exist" });
      }
      const saveabout = await prisma.aboutUs.create({
        data: {
          title,
          content,
          shortContent,
          aboutImages: files,
        },
      });

      await aboutController.revalidate("", "/biography");
      return res
        .status(200)
        .json({ success: true, message: "About Us Created SuccessFully" });
    } catch (error) {
      console.error("Error in adding About Us:", error);

      if (files) {
        await aboutController.deleteImage(files);
      }
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };
  static getAboutUs = async (req, res) => {
    try {
      const findabout = await prisma.aboutUs.findMany();

      if (findabout.length == 0) {
        return res
          .status(400)
          .json({ success: false, message: "About Us Does Not Exist" });
      }
      return res.status(200).json({ success: true, data: findabout });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };
  static updateAboutUs = async (req, res) => {
    const { title, shortContent, content } = req.body;
    const files =
      req?.files && req?.files.length > 0
        ? req?.files.map((el) => el.filename)
        : [];

    try {
      if (files.length == 0) {
        return res.status(400).json({
          success: false,
          message: "Please Upload Image Less Than 1Mb",
        });
      }
      if (req.fileValidationError) {
        await aboutController.deleteImage(files)
        return res
          .status(400)
          .json({ success: false, message: req.fileValidationError });
      }

      if (req?.files.length > 0) {
        for (let index = 0; index < req.files.length; index++) {
          if (req?.files[index].size > 1 * 1024 * 1024) {
            await aboutController.deleteImage(files);
            return res
              .status(400)
              .json({
                success: false,
                message: `${req.files[index].originalname} Exceeds 1 MB Please Upload Less than 1 MB`,
              });
          }
        }
      }

      if (!title || !content || !shortContent) {
        if (files) {
          await aboutController.deleteImage(files);
        }
        return res
          .status(400)
          .json({ success: false, message: "All Field Required" });
      }
      const findabout = await prisma.aboutUs.findFirst();
      if (!findabout) {
        if (files) {
          await aboutController.deleteImage(files);
        }
        return res
          .status(400)
          .json({ success: false, message: "About Us Doesnt Exist" });
      }

      const saveabout = await prisma.aboutUs.update({
        where: { id: findabout.id },
        data: {
          title,
          content,
          shortContent,
          aboutImages: files,
        },
      });

      await aboutController.deleteImage(findabout.aboutImages);
      await aboutController.revalidate("", "/biography");
      return res
        .status(200)
        .json({ success: true, message: "About Us Updated Successfully" });
    } catch (error) {
      if (files) {
        await aboutController.deleteImage(files);
      }
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };
}

export default aboutController;
