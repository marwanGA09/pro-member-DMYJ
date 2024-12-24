const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'members/photo', // Folder name in Cloudinary
    allowed_formats: [
      'jpg', // JPEG
      'jpeg', // JPEG
      'png', // Portable Network Graphics
      'gif', // Graphics Interchange Format
      'webp', // Web Picture Format
      'bmp', // Bitmap
      'tiff', // Tagged Image File Format
      'tif', // Tagged Image File Format (alternative extension)
      'svg', // Scalable Vector Graphics
      'heic', // High-Efficiency Image Coding
      'heif', // High-Efficiency Image File Format
      'avif', // AV1 Image File Format
    ], // Allowed image formats
    public_id: (req, file) =>
      `${req.body.fullName.split(' ').join('-')}-${Math.floor(
        Math.random() * 1000
      )}`,
    transformation: [
      { quality: '70' }, // Resize and compress
    ],
  },
});

module.exports = { cloudinary, storage };
