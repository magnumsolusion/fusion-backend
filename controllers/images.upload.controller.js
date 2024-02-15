import multer from 'multer'; // Import multer for handling file uploads
import cors from 'cors';
import express from'express';
const app = express();
app.use(cors());
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const imageFileFilter = (req, file, callback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error('Invalid file type. Only image files (JPEG, PNG, GIF, WebP) are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 9 * 1024 * 1024 },
});

const uploadFields = upload.fields([{ name: 'wide_image' }, { name: 'focus_image' }]);

export const imagesUpload = async (req, res, next) => {
 
// Route to handle image uploads for both wide and focus images
app.post('/upload', uploadFields, (req, res) => {
    const wideImage = req.files['wide_image'][0];
    const focusImage = req.files['focus_image'][0];
  
    if (wideImage && focusImage) {
      res.status(201).json({ message: 'Images uploaded successfully' });
    } else {
      res.status(400).json({ message: 'One or both images are missing' });
    }
  });


  }



