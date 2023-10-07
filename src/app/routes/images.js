// Librerias
import express from 'express';
import fileUpload from 'express-fileupload'; // se usa para poder ruta a una imagen

// componentes de aplicación
import { verifyToken } from '../helpers/acessToken.js';
import { addImage, deleteImagen, verImage, verImagenesId, updateImage } from '../controller/imagenes.cotroller.js';


// Inicialitation Rutas
const router = express.Router();


// UTILIZANDO RUTAS Y CONSULTAS
// Consulta todas las imagenes de un usuario
router.get('/verImagesId/:id', verImagenesId);

// Consulta una imagen
router.get('/verImage/:id', verifyToken, verImage);

// inserta una imagen 
router.post('/addImage/:id', verifyToken, fileUpload({
    useTempFiles: true,
    tempFileDir: './src/uploads'
}), addImage);

// borrar imagen
router.delete('/deleteImage/:id', verifyToken, deleteImagen);

// actualiza image
router.put('/updateImage/:id', async (req, res, next) => {
    try {
        const { name_img, description_img, album } = req.body;
        console.log(name_img, description_img, album);
    } catch (error) {
        console.log(error);
    }
});



export default router;