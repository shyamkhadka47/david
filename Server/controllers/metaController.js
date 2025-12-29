import prisma from "../config/config.js";

class metacontroller {
  static async revalidate(tag, path) {
    const res = await fetch(`${process.env.FRONTEND_URL}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tag ? { tag } : { path }),
    });
  }
  static addmetadata = async (req, res) => {
    const { page, title, description } = req.body;
    try {
      if (!page || !title || !description) {
        return res
          .status(400)
          .json({ success: false, message: "All fields required" });
      }
      const cleanPage = page.replace(/[\s-]/g, "").toLowerCase();

      const findmeta = await prisma.meta.findUnique({
        where: { page: cleanPage },
      });

      if (findmeta && findmeta.page == cleanPage) {
        return res.status(400).json({
          success: false,
          message: `MetaData for ${page} exists. Cannot create new for the same page.`,
        });
      }
      const meta = await prisma.meta.create({
        data: {
          page: cleanPage,
          title,
          description,
        },
      });
      //   if (!meta) {
      //     return res.status(400).json({
      //       success: false,
      //       message: "Error creating metadata. Please try again.",
      //     });
      //   }
      await metacontroller.revalidate("meta");
      return res.status(200).json({
        success: true,
        message: "Meta created successfully",
        data: meta,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error. Please try again.",
        error: error.message,
      });
    }
  };

  static getallmetadata = async (req, res) => {
    try {
      const findmetaData = await prisma.meta.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (!findmetaData) {
        return res
          .status(400)
          .json({ success: false, message: "No metadata exists" });
      }
      return res.status(200).json({ success: true, data: findmetaData });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error. Please try again later",
      });
    }
  };

  static getsinglemetadata = async (req, res) => {
    const { id } = req.params;
    try {
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "ID is not valid" });
      }
      const findmetadata = await prisma.meta.findUnique({ where: { id } });
      if (!findmetadata) {
        return res
          .status(400)
          .json({ success: false, message: "Metadata does not exist" });
      }
      return res.status(200).json({ success: true, data: findmetadata });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error. Please try again",
      });
    }
  };

  static updatemetadata = async (req, res) => {
    const { id } = req.params;
    const { page, title, description } = req.body;
    const cleanPage = page.replace(/[\s-]/g, "").toLowerCase();
    try {
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "ID not valid" });
      }
      const findmeta = await prisma.meta.findUnique({
        where: { page: cleanPage },
      });
      if (
        findmeta &&
        findmeta.page == cleanPage &&
        findmeta.id.toString() != id
      ) {
        return res.status(400).json({
          success: false,
          message: "Same Page Name Exist On Another Meta Data",
        });
      }
      const findmetaData = await prisma.meta.update({
        where: { id },
        data: { page: cleanPage, title, description },
      });

      await metacontroller.revalidate("meta");
      return res
        .status(200)
        .json({ success: true, message: "Meta updated successfully" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error. Please try again",
      });
    }
  };

  static deletemetadata = async (req, res) => {
    const { id } = req.params;
    try {
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "Please choose a valid ID" });
      }
      const findmetadata = await prisma.meta.findUnique({where:{id}});
      if (!findmetadata) {
        return res
          .status(400)
          .json({ success: false, message: "Metadata not found" });
      }
      await prisma.meta.delete({where:{id}});
      await metacontroller.revalidate("meta");
      return res
        .status(200)
        .json({ success: true, message: "Metadata deleted successfully" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error. Please try again",
      });
    }
  };
}

export default metacontroller;
