import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = 'visits';
    let resource_type = 'auto'; // handles both images & videos
    return {
      folder,
      resource_type,
      public_id: file.originalname.split('.')[0],
    };
  },
});

const upload = multer({ storage });

export default upload;
