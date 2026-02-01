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
  static async deleteImage(filename) {
    if (!filename) {
      return;
    }
    try {
      fs.promises.unlink(`public/uploads/${filename}`);
    } catch (error) {
      console.log("Error Deleting File", filename, errro);
    }
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
      phonenumber2,
      address,
      mapurl,
      email,
      fblink,
      twitterlink,
      linkedlink,
      youtubelink,
      shortdescriptionaboutbusiness,
    } = req.body;
    const filename = req?.file?.filename;
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "Image Required Less Than 1MB" });
      }
      if (!businessname || !phonenumber || !shortdescriptionaboutbusiness) {
        if (filename) {
          await siteSettingController.deleteImage(filename);
        }
        return res
          .status(400)
          .json({ success: false, message: "All Field Required" });
      }
      // if (isNaN(phonenumber) || isNaN(phonenumber2)) {
      //   if (filename) {
      //     await siteSettingController.deleteImage(filename);
      //   }
      //   return res
      //     .status(400)
      //     .json({ success: false, message: "Phone Number should be numeric" });
      // }

      const findSiteSetting = await prisma.siteSetting.findMany();
      if (findSiteSetting.length > 0) {
        if (filename) {
          await siteSettingController.deleteImage(filename);
        }
        return res
          .status(400)
          .json({ success: false, message: "Site Setting Already Exist" });
      }

      const createsitesetting = await prisma.siteSetting.create({
        data: {
          businessname,
          phonenumber,
          phonenumber2,
          address,
          mapurl,
          email,
          fblink,
          twitterlink,
          linkedlink,
          youtubelink,
          shortdescriptionaboutbusiness,
          businesslogo: filename,
        },
      });

      await siteSettingController.revalidate("siteSetting");
      return res
        .status(200)
        .json({ success: true, message: "Site Setting Created Successfully" });
    } catch (error) {
      if (filename) {
        await siteSettingController.deleteImage(filename);
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

      phonenumber,
      phonenumber2,
      address,
      mapurl,
      email,
      fblink,
      twitterlink,
      linkedlink,
      youtubelink,
      shortdescriptionaboutbusiness,
    } = req.body;

    const { filename } = req.file;
    try {
      const findSiteSetting = await prisma.siteSetting.findFirst();
      if (!findSiteSetting) {
        await siteSettingController.deleteImage(filename);
        return res
          .status(400)
          .json({ success: false, message: "No Site Setting Found" });
      }
      // if (isNaN(phonenumber) || isNaN(phonenumber2)) {
      //   if (filename) {
      //     await siteSettingController.deleteImage(filename);
      //   }
      //   return res
      //     .status(400)
      //     .json({ success: false, message: "Phone Number should be numeric" });
      // }
      const savesitesetting = await prisma.siteSetting.update({
        where: { id: findSiteSetting.id },
        data: {
          businessname,
          phonenumber,
          phonenumber2,
          address,
          mapurl,
          email,
          fblink,
          twitterlink,
          linkedlink,
          youtubelink,
          shortdescriptionaboutbusiness,
          businesslogo: filename,
        },
      });

      if (filename) {
        await siteSettingController.deleteImage(findSiteSetting.businesslogo);
      }
      await siteSettingController.revalidate("siteSetting");
      return res
        .status(200)
        .json({ success: true, message: "Site Setting Updated SuccessFully" });
    } catch (error) {
      console.log(error.stack);
      console.log(error.message);
      console.log(error.code);
      if (filename) {
        await siteSettingController.deleteImage(filename);
      }
      return res.status(500).json({
        success: false,
        message: "Internal Server Error Please Try Again",
      });
    }
  };
}
export default siteSettingController;
