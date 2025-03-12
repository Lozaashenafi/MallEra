import multer from "multer";
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

export const registerMall = async (req, res) => {
  try {
    // Validate incoming request using Joi
    const { error } = mallSchema.register.validate(req.body, {
      abortEarly: false,
    });
    // console.log("Received files:", req.files); // Debugging line
    // console.log("Received body:", req.body); // Log form data

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
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

    // Convert numeric values
    const parsedLatitude = parseFloat(latitude);
    const parsedLongitude = parseFloat(longitude);
    const parsedTotalFloors = parseInt(totalFloors);
    const parsedTotalRooms = parseInt(totalRooms);

    if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid latitude or longitude" });
    }

    if (isNaN(parsedTotalFloors) || isNaN(parsedTotalRooms)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid totalFloors or totalRooms" });
    }

    // Create Mall entry
    const mall = await prisma.mall.create({
      data: {
        mallName,
        latitude: parsedLatitude,
        longitude: parsedLongitude,
        address,
        description,
        totalFloors: parsedTotalFloors,
        totalRooms: parsedTotalRooms,
      },
    });

    // Save images if uploaded
    const images = [];
    if (req.files?.mainImage) {
      images.push({
        mallId: mall.id,
        imageURL: `/uploads/${req.files.mainImage[0].filename}`,
      });
    }
    if (req.files?.secondaryImage) {
      images.push({
        mallId: mall.id,
        imageURL: `/uploads/${req.files.secondaryImage[0].filename}`,
      });
    }
    if (req.files?.tertiaryImage) {
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
    console.error("Error in registerMall:", error); // Log error details
    res.status(500).json({
      success: false,
      message: "Error registering mall",
      error: error.message,
    });
  }
};
export const getMalls = async (req, res) => {
  try {
    const malls = await prisma.mall.findMany({
      include: {
        mallImage: true, // Include related images
      },
    });

    const formattedMalls = malls.map((mall) => ({
      id: mall.id, // Include Mall ID
      mallName: mall.mallName,
      address: mall.address,
      description: mall.description,
      totalFloors: mall.totalFloors,
      totalRooms: mall.totalRooms,
      image: mall.mallImage.length > 0 ? mall.mallImage[0].imageURL : null, // Get only the first image
    }));

    res.status(200).json({
      success: true,
      malls: formattedMalls,
    });
  } catch (error) {
    console.error("Error fetching malls:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching malls",
      error: error.message,
    });
  }
};

export const getMallById = async (req, res) => {
  const { id } = req.params;

  try {
    const mall = await prisma.mall.findUnique({
      where: { id: parseInt(id) },
      include: {
        mallImage: true, // Include images
      },
    });

    if (!mall) {
      return res
        .status(404)
        .json({ success: false, message: "Mall not found" });
    }

    const formattedMall = {
      ...mall,
      images: mall.mallImage.map((img) => img.imageURL), // Extract image URLs
    };

    res.status(200).json({
      success: true,
      mall: formattedMall,
    });
  } catch (error) {
    console.error("Error fetching mall by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching mall",
      error: error.message,
    });
  }
};

// Middleware for image upload (use .fields() to handle multiple fields)
export const uploadMallImagesMiddleware = uploadMallImages;
