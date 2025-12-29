import prisma from "../config/config.js";
import validator from "validator";

class videoController {
  static async revalidate(tag, path) {
    const res = await fetch(`${process.env.FRONTEND_URL}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tag ? { tag } : { path }),
    });
  }
  static getallvideos = async (req, res) => {
    try {
      const allvideos = await prisma.video.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (!allvideos) {
        return res
          .status(400)
          .json({ success: false, message: "No videos Link found" });
      }
      return res.status(200).json({ success: true, data: allvideos });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };
  static addVideo = async (req, res) => {
    const { title, description, videolink } = req.body;

    try {
      if (!title || !description || !videolink) {
        return res
          .status(400)
          .json({ success: false, message: "All Field Required" });
      }
      if (!validator.isURL(videolink)) {
        return res
          .status(400)
          .json({ success: false, message: "Please Choose valid URL" });
      }
      try {
        const addnewvideo = await prisma.video.create({
          data: {
            title,
            description,
            videolink,
          },
        });
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: "Failed To Add Video" });
      }
      await videoController.revalidate("videos");
      return res
        .status(200)
        .json({ success: true, message: "Video Added SuccessFully" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };
  static getsinglevideo = async (req, res) => {
    const { id } = req.params;

    try {
      if (!id) {
        return res.status(400).json({ success: false, message: "Id Required" });
      }
      const findvideobyid = await prisma.video.findUnique({ where: { id } });
      if (!findvideobyid) {
        return res
          .status(400)
          .json({ success: false, message: "Video Not Found" });
      }
      return res.status(200).json({ success: true, data: findvideobyid });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };
  static editvideo = async (req, res) => {
    const { id } = req.params;
    const { title, description, videolink } = req.body;
    try {
      if (!id) {
        return res.status(400).json({ success: false, message: "Id Required" });
      }
      if (!title || !description || !videolink) {
        return res
          .status(400)
          .json({ success: false, message: "All Field Required" });
      }
      const findvideobyid = await prisma.video.findUnique({ where: { id } });
      if (!findvideobyid) {
        return res
          .status(400)
          .json({ success: false, message: "Video not found" });
      }

      const updatevideobyid = await prisma.video.update({
        where: { id },
        data: { title, description, videolink },
      });
      await videoController.revalidate("videos");
      return res.status(200).json({ success: true, data: updatevideobyid });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };
  static deletevideo = async (req, res) => {
    const { id } = req.params;
    try {
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "Valid Id Required" });
      }

      const deletevideo = await prisma.video.delete({ where: { id } });

      await videoController.revalidate("videos");
      return res
        .status(200)
        .json({ success: true, message: "Video Deleted Successfully" });
    } catch (error) {
      if (error.code == "P2025") {
        return res
          .status(400)
          .json({
            success: false,
            message: "Either has already been deleted or it doesn't exists.",
          });
      }

      return res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error Please Try Again",
        });
    }
  };
}

export default videoController;
