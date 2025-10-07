import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import { v4 as uuidv4 } from 'uuid';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = 'events'; // 📂 Folder for event uploads
    const resource_type = 'auto'; // handles both images & videos
    return {
      folder,
      resource_type,
      public_id: `${file.originalname.split('.')[0]}_${uuidv4()}`, // unique filename
    };
  },
});

const uploadEvents = multer({ storage });

export default uploadEvents;
