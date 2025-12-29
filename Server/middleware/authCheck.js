import jwt from "jsonwebtoken";
import prisma from "../config/config.js"; // Importing Prisma Client

const protect = async (req, res, next) => {
  // Check if the Authorization header is present
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(400).json({
      success: false,
      message: "Not Authorized, Bearer token missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    // Find the user by the ID decoded from the token using Prisma
    const findUser = await prisma.user.findUnique({
      where: { id: decode.id },
    });

    if (!findUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    const { password:_ , ...rest } = findUser;

    // Attach the user data to the request object
    req.user = rest;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(403).json({ message: "Expired or Invalid Token" });
  }
};

export default protect;
