import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = 'visits'; // 📂 Folder for visit uploads
    const resource_type = 'auto'; // handles both images & videos
    return {
      folder,
      resource_type,
      public_id: `${file.originalname.split('.')[0]}_${uuidv4()}`, // unique filename
    };
  },
});

const uploadVisits = multer({ storage });

export default uploadVisits;
