import fs from "fs/promises";
import prisma from "../config/config.js"

class StorytellerController {
  static async revalidate(tag, path) {
    const res = await fetch(`${process.env.FRONTEND_URL}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tag ? { tag } : { path }),
    });
  }
  /**
   * Generate slug from title: lowercase, trim, no special chars, hyphens instead of spaces.
   */
  static generateSlug(title) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-") // spaces to hyphens
      .replace(/-+/g, "-"); // collapse multiple hyphens
  }

  /**
   * Delete file safely, logs error if any.
   */
  static async deleteFile(filename) {
    if (!filename) return;
    try {
      await fs.unlink(`public/storytellers/${filename}`);
    } catch (err) {
      console.error("File deletion error:", err);
    }
  }

  /**
   * Create new story with slug uniqueness check.
   * Deletes uploaded file if validation or DB fails.
   */
  static async addnewstory(req, res) {
    const { title, content } = req.body;
    const filename = req.file?.filename;

    if (req.file.size >= 1 * 1024 * 1024) {
      if (filename) {
        await StorytellerController.deleteFile(filename);
      }
      return res
        .status(400)
        .json({
          success: false,
          message: "Please upload a featured image less than 1 MB.",
        });
    }

    if (!title || !content) {
      if (filename) await StorytellerController.deleteFile(filename);
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const slug = StorytellerController.generateSlug(title);

    try {
      // Check for slug conflict
      const existing = await prisma.blog.findUnique({where:{slug}});
      if (existing) {
        if (filename) await StorytellerController.deleteFile(filename);
        return res
          .status(400)
          .json({
            success: false,
            message: "A story with this title already exists.",
          });
      }

      await prisma.blog.create({data:{
        title,
        content,
        featuredImage: filename,
        slug,
      }});
      await StorytellerController.revalidate("", `/storyteller/${slug}`)
      return res
        .status(200)
        .json({ success: true, message: "Story created successfully." });
    } catch (error) {
      if (filename) await StorytellerController.deleteFile(filename);
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  }

  /**
   * Get all stories sorted newest first.
   */
  static async getallstories(req, res) {
    try {
      const storytellers = await prisma.blog.findMany({orderBy:{createdAt:"desc"}});
      return res.status(200).json({ success: true, data: storytellers });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch stories." });
    }
  }

  /**
   * Get single story by slug.
   */
  static async getsinglestory(req, res) {
    const { slug } = req.params;

    try {
      const storyteller = await prisma.blog.findUnique({where:{ slug }});
      if (!storyteller) {
        return res
          .status(400)
          .json({ success: false, message: "Story not found." });
      }
      return res.status(200).json({ success: true, data: storyteller });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Server error." });
    }
  }

  /**
   * Update story by slug with slug uniqueness check on title change.
   * Deletes new uploaded file on errors.
   * Deletes old file if new one replaces it.
   */
  static async updatestory(req, res) {
    const { slug } = req.params;
    const { title, content } = req.body;
    const newFilename = req.file?.filename;

    if (req.file.size >= 1 * 1024 * 1024) {
      if (newFilename) {
        await StorytellerController.deleteFile(newFilename);
      }
      return res
        .status(400)
        .json({
          success: false,
          message: "Please upload a featured image less than 1 MB.",
        });
    }

    try {
      const existing = await prisma.blog.findUnique({where:{ slug }});
      if (!existing) {
        if (newFilename) await StorytellerController.deleteFile(newFilename);
        return res
          .status(400)
          .json({ success: false, message: "Story not found." });
      }

      if (!title || !content) {
        if (newFilename) await StorytellerController.deleteFile(newFilename);
        return res
          .status(400)
          .json({ success: false, message: "Title and content are required." });
      }

      const newSlug = StorytellerController.generateSlug(title);

      // If slug changed, check for conflicts
      if (newSlug !== slug) {
        const conflict = await prisma.blog.findUnique({where:{ slug: newSlug }});
        if (conflict) {
          if (newFilename) await StorytellerController.deleteFile(newFilename);
          return res
            .status(400)
            .json({
              success: false,
              message: "Another story with this title already exists.",
            });
        }
      }

      const updatedData = {
        title,
        content,
        slug: newSlug,
        featuredImage: newFilename || existing.featuredImage,
      };

      const updated = await prisma.blog.update(
        {where:{ slug },
        data:{...updatedData}}
      );

      // Delete old file if replaced
      if (
        newFilename &&
        existing.featuredImage &&
        existing.featuredImage !== newFilename
      ) {
        await StorytellerController.deleteFile(existing.featuredImage);
      }
      await StorytellerController.revalidate("", `/storyteller/${newSlug}`)
      return res
        .status(200)
        .json({
          success: true,
          message: "Story updated successfully.",
          storyteller: updated,
        });
    } catch (error) {
      if (newFilename) await StorytellerController.deleteFile(newFilename);
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  }

  /**
   * Delete story by slug and its associated file.
   */
  static async deletestory(req, res) {
    const { slug } = req.params;

    try {
      const storyteller = await prisma.blog.findUnique({where:{ slug }});
      if (!storyteller) {
        return res
          .status(400)
          .json({ success: false, message: "Story not found." });
      }

      await prisma.blog.delete({where:{ slug }});
      await StorytellerController.deleteFile(storyteller.featuredImage);
      await StorytellerController.revalidate("", `/storyteller/${slug}`)
      return res
        .status(200)
        .json({ success: true, message: "Story deleted successfully." });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  }
}

export default StorytellerController;
