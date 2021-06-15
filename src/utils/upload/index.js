import fs from "fs";
import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import {fileURLToPath} from "url"
import path, {dirname} from "path"


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
   
  });

  const {CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;
  cloudinary.config ({
      cloud_name:CLOUDINARY_NAME,
      api_key: CLOUDINARY_KEY,
      api_secret:CLOUDINARY_SECRET

  })


const _filename = fileURLToPath(import.meta.url);

const _dirname = dirname(_filename);

const publicDirectory = path.join(_dirname, "../../../public");

export const parseFile = multer({storage});

// export const uploadFile = (req,res,next) => {

//     try {
//         const {originalname, buffer} = req.file;
//         const extension = extname(originalname);
//         const filename = `${req.params.id}${extension}`;
//         const pathToFile = path.join(publicDirectory, fileName);
//         fs.writeFileSync(pathToFile, buffer);
//         const link = `http://localhost:3001/${filename}`;
//         req.file = link;
//         next(); }
//         catch (error){
//             next(error);
//         }

//     }







