import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../config/prismaClient.js";
import authSchema from "./authSchema.js";

// Register Admin
export const register = async (req, res) => {
  try {
    // Validate request body
    const { error } = authSchema.register.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Admin User
    const user = await prisma.user.create({
      data: {
        fullName,
        username: email, // Using email as username
        email,
        password: hashedPassword,
        role: "ADMIN",
        status: "ACTIVE",
      },
    });

    res
      .status(201)
      .json({ message: "Admin registered successfully", userId: user.id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    // Validate request body
    const { error } = authSchema.login.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Check if user is an ADMIN or MALL_OWNER
    if (user.role !== "ADMIN" && user.role !== "MALL_OWNER")
      return res.status(403).json({ message: "Access denied" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });

    let mallName = null;

    // If the user is a MALL_OWNER, fetch the mall name
    if (user.role === "MALL_OWNER" && user.mallId) {
      const mall = await prisma.mall.findUnique({
        where: { id: user.mallId },
        select: { mallName: true },
      });
      mallName = mall ? mall.mallName : null;
    }

    // Generate JWT token with mallName only for MALL_OWNER
    const tokenPayload = {
      userId: user.id,
      mallId: user.mallId,
      role: user.role,
      fullName: user.fullName,
    };

    if (mallName) {
      tokenPayload.mallName = mallName; // Add mallName only for MALL_OWNER
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "12h", // token will expire in 12 hours
    });

    res.json({ message: "Login successful", token, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message, success: false });
  }
};
