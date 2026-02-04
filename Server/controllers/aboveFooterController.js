import prisma from "../config/config.js";

class aboveFooterController {
  static async revalidate(tag, path) {
    try {
      await fetch(`${process.env.FRONTEND_URL}/api/revalidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tag ? { tag } : { path }),
      });
    } catch (err) {
      console.log("Revalidate failed:", err.message);
    }
  }

  // CREATE
  static addContent = async (req, res) => {
    const { page, content } = req.body;
    const cleanPage = page.replace(/[\s-]/g, "").toLowerCase();
    try {
      if (!page || !content) {
        return res
          .status(400)
          .json({ success: false, message: "Page and Content required" });
      }

      const saved = await prisma.pageContentAboveFooter.create({
        data: { page: cleanPage, content },
      });
      await aboveFooterController.revalidate("pageContent");
      return res
        .status(200)
        .json({ success: true, message: "content created" });
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(400).json({
          success: false,
          message: "content for this page already exists",
        });
      }
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  // READ ALL
  static getAllContent = async (req, res) => {
    try {
      const contents = await prisma.pageContentAboveFooter.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (contents.length < 1) {
        return res
          .status(400)
          .json({ success: false, message: "Content Not Available" });
      }
      return res.status(200).json({ success: true, data: contents });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  // READ SINGLE BY PAGE
  static getSingleContentbyPage = async (req, res) => {
    const { page } = req.params;
    if (!page) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Page" });
    }
    try {
      const getdata = await prisma.pageContentAboveFooter.findUnique({
        where: { page },
      });
      if (!getdata) {
        return res
          .status(400)
          .json({ success: false, message: "User Question Not Found" });
      }
      return res.status(200).json({ success: true, data: getdata });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };
  // READ SINGLE BY ID
  static getSingleContent = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide Valid Id" });
    }
    try {
      const content = await prisma.pageContentAboveFooter.findUnique({
        where: { id },
      });
      if (!content)
        return res
          .status(400)
          .json({ success: false, message: "Content not found" });
      return res.status(200).json({ success: true, data: content });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  // UPDATE
  static updateContent = async (req, res) => {
    const { id } = req.params;
    const { page, content } = req.body;
    const cleanPage = page.replace(/[\s-]/g, "").toLowerCase();
    try {
      const updated = await prisma.pageContentAboveFooter.update({
        where: { id },
        data: { page: cleanPage, content },
      });
      await aboveFooterController.revalidate("pageContent");
      return res.status(200).json({
        success: true,
        message: "Content updated successfully",
        data: updated,
      });
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(400).json({
          success: false,
          message: "Content for this page already exist",
        });
      }
      if (error.code === "P2025") {
        return res
          .status(400)
          .json({ success: false, message: "Content not found" });
      }
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  // DELETE
  static deleteContent = async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.pageContentAboveFooter.delete({ where: { id } });
      await aboveFooterController.revalidate("pageContent");
      return res
        .status(200)
        .json({ success: true, message: "Content deleted successfully" });
    } catch (error) {
      if (error.code === "P2025")
        return res
          .status(400)
          .json({ success: false, message: "Content not found" });
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
}

export default aboveFooterController;
