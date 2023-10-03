import { v2 as cloudinary } from "cloudinary"

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
})

 export async function fotoUpload(filePath) {
 return await cloudinary.uploader.upload(filePath, {
   folder: 'FotosApi'
 })
}

export async function fotoDelete(publicId){
  return await cloudinary.uploader.destroy(publicId) 
}
