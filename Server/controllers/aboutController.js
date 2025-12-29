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
    if (!filename) {
      return;
    }
    try {
      await fs.promises.unlink(`public/about/${filename}`);
    } catch (error) {
      return console.log(error);
    }
  }

  static addAboutUs = async (req, res) => {
    const { title, content } = req.body;
    const filename = req.file?.filename;

    if (!req.file || req.file.size > 1 * 1024 * 1024) {
      return res
        .status(400)
        .json({ success: false, message: "Image Required Less Than 1 MB" });
    }
    if (!title || !content) {
      if (filename) {
        await aboutController.deleteImage(filename);
      }
      return res
        .status(400)
        .json({ success: false, message: "All Field Required" });
    }
    try {
      const findabout = await prisma.aboutUs.findMany();
      console.log(findabout);
      if (findabout.length > 0) {
        await aboutController.deleteImage(filename);
        return res
          .status(400)
          .json({ success: false, message: "About Us Exist" });
      }
      const saveabout = await prisma.aboutUs.create({
        data: {
          title,
          content,
          aboutImage: filename,
        },
      });
      await aboutController.deleteImage(findabout.aboutImage);
      await aboutController.revalidate("", "/biography");
      return res
        .status(200)
        .json({ success: true, message: "About Us Created SuccessFully" });
    } catch (error) {
      console.error("Error in adding About Us:", error);

      if (filename) {
        await aboutController.deleteImage(filename);
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
    const { title, content } = req.body;
    const filename = req.file?.filename;
    try {
      if (!filename) {
        return res.status(400).json({
          success: false,
          message: "Please Upload Image Less Than 1Mb",
        });
      }
      if (!title || !content) {
        if (filename) {
          await aboutController.deleteImage(filename);
        }
        return res
          .status(400)
          .json({ success: false, message: "All Field Required" });
      }
      const findabout = await prisma.aboutUs.findFirst();
      if (!findabout) {
        if (filename) {
          await aboutController.deleteImage(filename);
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
          aboutImage: filename,
        },
      });

      await aboutController.deleteImage(findabout.aboutImage);
      await aboutController.revalidate("", "/biography");
      return res
        .status(200)
        .json({ success: true, message: "About Us Updated Successfully" });
    } catch (error) {
      if (filename) {
        try {
          await fs.promises.unlink(`public/about/${filename}`);
        } catch (error) {
          console.log(error);
        }
      }
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };
}

export default aboutController;
