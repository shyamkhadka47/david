import prisma from "../config/config.js"; // Importing Prisma Client
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class authController {
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "All Fields Required" });
      }

      // Find user by email using Prisma
      const findUser = await prisma.user.findUnique({ where: { email } });
      if (!findUser) {
        return res
          .status(400)
          .json({ success: false, message: "User Doesn't Exist" });
      }

      // Compare password with hashed password stored in DB
      const comparepassword = await bcryptjs.compare(
        password,
        findUser.password
      );
      if (!comparepassword) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Credentials" });
      }

      // Generate JWT token
      const token = generateToken(findUser.id);

      // Exclude password field from the response
      const { password: _, ...rest } = findUser;
      res.status(200).json({
        success: true,
        message: "Login SuccessFul",
        user: rest,
        token,
      });
    } catch (error) {
      console.error("Error during user login:", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong during login",
      });
    }
  };

  static userRegister = async (req, res) => {
    try {
      const { email, password } = req?.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "All Fields Are Required" });
      }

      // Check if user already exists in the database using Prisma
      const findUser = await prisma.user.findUnique({ where: { email } });
      if (findUser) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      }

      // Hash the password before storing in the DB
      const hashedPassword = await bcryptjs.hash(password, 10);

      // Create new user in the database using Prisma
      const saveUser = await prisma.user.create({
        data: { email, password: hashedPassword },
      });

      // Exclude password field from the response
      const { password: _, ...rest } = saveUser;
      return res.status(200).json({
        success: true,
        message: "User Created Successfully",
        user: rest,
      });
    } catch (error) {
      console.error("Error during user registration:", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while registering the user",
      });
    }
  };

  static isVerified = async (req, res) => {
    res.status(200).json({ success: true, message: "Verified", data:req.user });
  };

  static deleteUser = async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required to delete a user",
        });
      }

      // Only allow the logged-in user to delete themselves
      if (req.user.email !== email) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to delete this user",
        });
      }

      // Delete user from the database using Prisma
      const deletedUser = await prisma.user.delete({ where: { email } });

      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while deleting the user",
      });
    }
  };
}

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1h" });
};

export default authController;
