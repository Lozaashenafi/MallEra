import multer from "multer";
import path from "path";
import mallSchema from "./mallSchema.js";
import prisma from "../../config/prismaClient.js";

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Use .fields() for multiple fields (mainImage, secondaryImage, tertiaryImage)
const uploadMallImages = multer({ storage }).fields([
  { name: "mainImage", maxCount: 1 },
  { name: "secondaryImage", maxCount: 1 },
  { name: "tertiaryImage", maxCount: 1 },
]);

// Register a new Mall
export const registerMall = async (req, res) => {
  const { error } = mallSchema.register.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  const {
    mallName,
    latitude,
    longitude,
    address,
    description,
    totalFloors,
    totalRooms,
  } = req.body;

  try {
    // Create the Mall entry
    const mall = await prisma.mall.create({
      data: {
        mallName,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        address,
        description,
        totalFloors: parseInt(totalFloors),
        totalRooms: parseInt(totalRooms),
      },
    });

    // Save images if uploaded
    const images = [];
    if (req.files.mainImage) {
      images.push({
        mallId: mall.id,
        imageURL: `/uploads/${req.files.mainImage[0].filename}`,
      });
    }
    if (req.files.secondaryImage) {
      images.push({
        mallId: mall.id,
        imageURL: `/uploads/${req.files.secondaryImage[0].filename}`,
      });
    }
    if (req.files.tertiaryImage) {
      images.push({
        mallId: mall.id,
        imageURL: `/uploads/${req.files.tertiaryImage[0].filename}`,
      });
    }

    if (images.length > 0) {
      await prisma.mallImage.createMany({ data: images });
    }

    res.status(201).json({
      success: true,
      message: "Mall registered successfully",
      mall,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering mall",
      error: error.message,
    });
  }
};

// Middleware for image upload (use .fields() to handle multiple fields)
export const uploadMallImagesMiddleware = uploadMallImages;
