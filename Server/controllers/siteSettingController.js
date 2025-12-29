import prisma from "../config/config.js";
import fs from "fs";

class siteSettingController {
  static async revalidate(tag, path) {
    const res = await fetch(`${process.env.FRONTEND_URL}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tag ? { tag } : { path }),
    });
  }
  static getSiteSetting = async (req, res) => {
    try {
      const findSiteSetting = await prisma.siteSetting.findFirst();
    
      if (!findSiteSetting) {
        return res
          .status(400)
          .json({ success: false, message: "No Site Setting Available" });
      }

      res.status(200).json({ success: true, data: findSiteSetting });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Something Went Wrong" });
    }
  };
  static addSiteSetting = async (req, res) => {
    const {
      businessname,
      phonenumber,
      email,
      fblink,
      twitterlink,
      linkedlink,
      youtubelink,
      shortdescriptionaboutbusiness,
    } = req.body;

    const file = req?.file;
    if (!req.file || file.size >= 1 * 1024 * 1024) {
      await fs.promises.unlink(`public/uploads/${file.filename}`);
      return res.status(400).json({
        success: false,
        message: "Please Upload Image Less Than 1 Mb",
      });
    }

    try {
      // Ensure file is uploaded before proceeding
      if (!file || file.originalname === "undefined") {
        await fs.promises.unlink(`public/uploads/${file.filename}`);
        return res.status(400).json({
          success: false,
          message: "Please Select Image Less than 1MB",
        });
      }

      if (!businessname || !shortdescriptionaboutbusiness) {
        if (file.filename) {
          try {
            await fs.promises.unlink(`public/uploads/${file.filename}`);
          } catch (error) {
            console.log(error);
          }
        }
        return res.status(400).json({
          success: false,
          message: "Business Name and Description Field Required",
        });
      }

      const findSiteSetting = await prisma.siteSetting.findMany();

      if (findSiteSetting.length > 0) {
        if (file.filename) {
          try {
            await fs.promises.unlink(`public/uploads/${file.filename}`);
          } catch (error) {
            console.log(error);
          }
        }
        return res
          .status(400)
          .json({ success: false, message: "Site Setting Already Exist" });
      }

      const createsitesetting = await prisma.siteSetting.create({
        data: {
          businessname,
          phonenumber,
          email,
          fblink,
          twitterlink,
          linkedlink,
          youtubelink,
          shortdescriptionaboutbusiness,
          businesslogo: file.filename,
        },
      });

      await siteSettingController.revalidate("sitesettings");
      return res
        .status(200)
        .json({ success: true, message: "Site Setting Created Successfully" });
    } catch (error) {
      console.log(error);
      if (file.filename) {
        try {
          await fs.promises.unlink(`public/uploads/${file.filename}`);
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

  static editSiteSetting = async (req, res) => {
    const {
      businessname,
      businessLogo,
      phonenumber,
      email,
      fblink,
      twitterlink,
      linkedlink,
      youtubelink,
      shortdescriptionaboutbusiness,
    } = req.body;
    const { filename } = req?.file;

    try {
      const findSiteSetting = await prisma.siteSetting.findFirst();
      if (!findSiteSetting) {
        try {
          await fs.promises.unlink(`public/uploads/${filename}`);
        } catch (error) {
          console.log(error);
        }
        return res
          .status(400)
          .json({ success: false, message: "No Site Setting Found" });
      }

      const savesitesetting = await prisma.siteSetting.update({
        where: { id: findSiteSetting.id },
        data: {
          businessname,
          phonenumber,
          email,
          fblink,
          twitterlink,
          linkedlink,
          youtubelink,
          shortdescriptionaboutbusiness,
          businesslogo: filename,
        },
      });

      if (!savesitesetting) {
        if (filename) {
          try {
            await fs.promises.unlink(`public/uploads/${filename}`);
          } catch (error) {
            console.log(error);
          }
        }

        return res
          .status(400)
          .json({ success: false, message: "Cannot Update Site Setting" });
      }

      if (filename) {
        fs.unlink(`public/uploads/${findSiteSetting.businesslogo}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
      await siteSettingController.revalidate("sitesettings");
      return res
        .status(200)
        .json({ success: true, message: "Site Setting Updated SuccessFully" });
    } catch (error) {
      if (filename) {
        try {
          await fs.promises.unlink(`public/uploads/${filename}`);
        } catch (error) {
          console.log(error.message);
        }
      }
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };
}
export default siteSettingController;
