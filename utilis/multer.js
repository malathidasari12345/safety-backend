const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dfbfpq5rf",
  api_key: "696592384759584",
  api_secret: "SV2Wo24FOG_2OYjYrqAYfXWeQIs",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => {
      const fileExtension = file.mimetype.split("/")[1];
      if (["png", "jpg", "jpeg", "svg"].includes(fileExtension)) {
        return fileExtension;
      }
      throw new Error("Unsupported file format");
    },
    public_id: (req, file) => file.originalname.split(".")[0],
  },
});

const upload = multer({ storage });

module.exports = upload;
