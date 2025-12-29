// controllers/BannerVideoController.js
import fs from "fs/promises";
import prisma from "../config/config.js";

class BannerVideoController {
  static async revalidate(tag) {
    const res = await fetch(`${process.env.FRONTEND_URL}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tag }),
    });
  }
  static async deleteFile(filename) {
    if (filename) {
      try {
        await fs.unlink(`public/bannervideos/${filename}`);
      } catch (err) {
        console.error("File deletion error:", err);
      }
    }
  }

  static async addBannerVideo(req, res) {
    const { title, page, description } = req.body;
    const filename = req.file?.filename;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload a video file" });
    }

    if (!title || !description || !page) {
      if (filename) {
        await BannerVideoController.deleteFile(filename);
      }
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    try {
      const cleanPage = page.replace(/[\s-]/g, "").toLowerCase();

      const pageexist = await prisma.bannerVideo.findUnique({
        where: { page: cleanPage },
      });

      if (pageexist && pageexist.page == cleanPage) {
        if (filename) {
          await BannerVideoController.deleteFile(filename);
        }
        return res.status(400).json({
          success: false,
          message: "Another Banner Video With Same Page Name Exists",
        });
      }
      await prisma.bannerVideo.create({
        data: {
          title,
          page: cleanPage,
          description,
          videoFile: filename,
        },
      });
      await BannerVideoController.revalidate("bannervideos");
      return res
        .status(200)
        .json({ success: true, message: "Banner video created successfully" });
    } catch (error) {
      await BannerVideoController.deleteFile(filename);
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  static async getAllBannerVideos(req, res) {
    try {
      const videos = await prisma.bannerVideo.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json({ success: true, videos });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to retrieve banner videos" });
    }
  }
  static async getSingleBannerVideo(req, res) {
    const { id } = req.params;

    try {
      const video = await prisma.bannerVideo.findUnique({ where: { id } });
      if (!video) {
        return res
          .status(404)
          .json({ success: false, message: "Banner video not found" });
      }

      return res.status(200).json({ success: true, data: video });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  static async updateBannerVideo(req, res) {
    const { id } = req.params;
    const { title, page, description } = req.body;
    const filename = req.file?.filename;
    const cleanPage = page.replace(/[\s-]/g, "").toLowerCase();

    try {
      // Fetch existing video record
      const existingVideo = await prisma.bannerVideo.findUnique({
        where: { id },
      });
      if (!existingVideo) {
        if (filename) await BannerVideoController.deleteFile(filename);
        return res
          .status(404)
          .json({ success: false, message: "Banner video not found" });
      }

      // All fields including new file must be present
      if (!title || !description || !filename || !page) {
        if (filename) await BannerVideoController.deleteFile(filename);
        return res.status(400).json({
          success: false,
          message: "Title,Page, description, and video file are required",
        });
      }
      const pageexist = await prisma.bannerVideo.findUnique({
        where: { page: cleanPage },
      });

      if (
        pageexist &&
        pageexist.page == cleanPage &&
        pageexist.id.toString() !== id
      ) {
        if (filename) {
          await BannerVideoController.deleteFile(filename);
        }
        return res.status(400).json({
          success: false,
          message: "Another Banner Video With Same Page Name Exists",
        });
      }
      // Update the document
      const updatedVideo = await prisma.bannerVideo.update({
        where: { id },
        data: { title, page: cleanPage, description, videoFile: filename },
      });


      // Delete old video file
      await BannerVideoController.deleteFile(existingVideo.videoFile);
      await BannerVideoController.revalidate("bannervideos");
      return res
        .status(200)
        .json({ success: true, message: "Banner video updated successfully" });
    } catch (error) {
      if (filename) await BannerVideoController.deleteFile(filename);
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  static async deleteBannerVideo(req, res) {
    const { id } = req.params;

    try {
      const video = await prisma.bannerVideo.findUnique({ where: { id } });
      if (!video) {
        return res
          .status(404)
          .json({ success: false, message: "Banner video not found" });
      }

      await prisma.bannerVideo.delete({ where: { id } });
      await BannerVideoController.deleteFile(video.videoFile);
      await BannerVideoController.revalidate("bannervideos");

      return res
        .status(200)
        .json({ success: true, message: "Banner video deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

export default BannerVideoController;
