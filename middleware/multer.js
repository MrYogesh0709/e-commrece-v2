import multer from "multer";

// Create multer storage configuration
const storage = multer.diskStorage({});

// Create multer instance with the storage configuration
const upload = multer({ storage });

// Define the middleware function
const uploadMiddleware = (fieldName) => {
  return (req, res, next) => {
    // Use the `upload` middleware with the specified field name
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        // Handle any upload errors
        return res.status(400).json({ error: "Error uploading file" });
      }
      next();
    });
  };
};

export default uploadMiddleware;
