import fs from "fs";
import prisma from "../config/config.js";
class sliderController {
  static async revalidate(tag, path) {
    const res = await fetch(`${process.env.FRONTEND_URL}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tag ? { tag } : { path }),
    });
  }
  static async deleteImage(filename) {
    try {
      if (!filename) {
        return;
      }
      await fs.promises.unlink(`public/slider/${filename}`);
    } catch (error) {
      console.log(error);
    }
  }

  static addSlider = async (req, res) => {
    const { page, title, description } = req.body;
    const filename = req?.file?.filename;

    const cleanPage = page.replace(/[\s-]/g, "").toLowerCase();

    try {
      if (!page || !title || !description) {
        if (filename) {
          await sliderController.deleteImage(filename);
        }

        return res
          .status(400)
          .json({ success: false, message: "All Fields Are required" });
      }
      // const findslider = await slidermodal.find();

      // if (findslider.length > 2) {
      //   if (filename) {
      //   try {
      //       await fs.promises.unlink(`public/slider/${filename}`);
      //   } catch (error) {
      //     console.log(error.message)
      //   }
      //   }

      //   return res
      //     .status(400)
      //     .json({ success: false, message: "Max 3 Sliders Can be Uploaded" });
      // }

      const saveslider = await prisma.slider.create({
        data: {
          page: cleanPage,
          title,

          description,
          sliderImage: filename,
        },
      });

      await sliderController.revalidate("sliders");
      return res
        .status(200)
        .json({ success: true, message: "Slider Created SuccessFully" });
    } catch (error) {
      if (filename) {
        await sliderController.deleteImage(filename);
      }
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try again",
      });
    }
  };

  static getSlider = async (req, res) => {
    try {
      const findslider = await prisma.slider.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (findslider.length == 0) {
        return res.status(400).json({
          success: false,
          message: "No Slider Found",
          data: findslider,
        });
      }

      return res.status(200).json({ success: true, data: findslider });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };

  static deleteSlider = async (req, res) => {
    const { id } = req.params;

    try {
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "Id Required to Delete" });
      }

      const data = await prisma.slider.delete({ where: { id } });

      await sliderController.deleteImage(data.sliderImage);
      await sliderController.revalidate("sliders");
      return res
        .status(200)
        .json({ success: true, message: "Slider Deleted SuccessFully" });
    } catch (error) {
      if (error.code == "P2025") {
        return res
          .status(400)
          .json({ success: false, message: "Slider Not Found Invalid Id" });
      }
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };

  static singleSlider = async (req, res) => {
    const { id } = req.params;
    try {
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "Id Required to edit Slider" });
      }
      const findslider = await prisma.slider.findUnique({ where: { id } });
      if (!findslider) {
        return res
          .status(400)
          .json({ success: false, message: "Slider Not Found" });
      }
      return res.status(200).json({ success: true, data: findslider });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };

  static singleSliderbypage = async (req, res) => {
    const { page } = req.params;
    if (!page) {
      return res.status(400).json({
        success: false,
        message: "Page Required",
      });
    }
    try {
      const findslider = await prisma.slider.findMany({ where: { page } });

      return res.status(200).json({
        success: true,
        data: findslider,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };

  static updateSlider = async (req, res) => {
    const { page, title, description } = req.body;
    const filename = req?.file?.filename;
    const { id } = req.params;
    const cleanPage = page.replace(/[\s-]/g, "").toLowerCase();
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Id Required to Update Slider" });
    }
    try {
      const findslider = await prisma.slider.findUnique({ where: { id } });

      if (!findslider) {
        if (filename) {
          await sliderController.deleteImage(filename);
        }
        return res
          .status(400)
          .json({ success: false, message: "Slider Not Found" });
      }

      const updatedslider = await prisma.slider.update({
        where: { id },
        data: {
          page: cleanPage,
          title,

          description,
          sliderImage: filename,
        },
      });

      if (filename) {
        await sliderController.deleteImage(findslider.sliderImage);
      }
      await sliderController.revalidate("sliders");
      return res
        .status(200)
        .json({ success: true, message: "Slider Updated successfully" });
    } catch (error) {
      if (filename) {
        await sliderController.deleteImage(filename);
      }

      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };
}

export default sliderController;
