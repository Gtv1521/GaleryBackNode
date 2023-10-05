// librerias 
import { v2 as cloudinary } from "cloudinary"
import dotenv from 'dotenv';

// iniciando estancias 
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});

 const fotoUpload = async (filePath) => {
 return await cloudinary.uploader.upload(filePath, {
   folder: 'aplicacionFotos'
 })
}

const fotoDelete = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId) 
}

export { fotoUpload, fotoDelete }