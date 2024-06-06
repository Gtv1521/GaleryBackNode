// Librerias
import express from 'express';
import fileUpload from 'express-fileupload'; // se usa para poder ruta a una imagen

// componentes de aplicación
import { verifyToken } from '../helpers/acessToken.js';
import { addImage, deleteImagen, verImage, verImagenesId, updateImage, verImagesAlbum, verAllImagesAlbum } from '../controller/imagenes.cotroller.js';


// Inicialitation Rutas
const router = express.Router();


// UTILIZANDO RUTAS Y CONSULTAS
// Consulta todas las imagenes de un usuario
/**
 * @swagger
 * components:
 *  schemas:
 *    Imagenes:
 *      type: object
 *      properties:
 *        id_img: 
 *           type: integer
 *           description: Id de imagen
 *        name_img:
 *           type: string
 *           description: Nombre de imagen   
 *        description_img: 
 *           type: string
 *           description: Descripcion de imagen
 *        url_img: 
 *           type: string
 *           description: url de la imagen en cloudinary
 *        id_url: 
 *           type: integer
 *           description: id en cloudinary de la imagen
 *        user_id: 
 *           type: string
 *           description: Id del usuario dueño de la imagen
 *        fecha: 
 *           type: date
 *           description: fecha donde se actualizo de la imagen
 *        album_id: 
 *           type: integer
 *           description: Id del album de la imagen
 */

/**
 * @swagger
 * tags:
 *  name: Imagenes
 *  description: Rutas de CRUD de imagenes  
 */
/**
 * @swagger
 * /verImagesId/{id_user}/{pagina}/{cantidad}:
 *  get:
 *   summary: Muestra todas los imagenes por usuario.
 *   security:
 *     - ApiKeyAuth: []
 *   tags: [Imagenes]   
 *   parameters:
 *     - in: path
 *       name: id_user
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *     - in: path
 *       name: pagina
 *       required: true
 *       scheme:
 *          type: integer
 *          format: int64
 *     - in: path
 *       name: cantidad
 *       required: true
 *       scheme:
 *          type: integer
 *          format: int64
 *   description: Peticion para mostrar imagenes
 *   responses:
 *     '200':    # status code
 *        description: Lista de imagenes de usuario
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Imagenes'
 *           example:
 *             id_img: 51
 *             name_img: mi image
 *             description_img: me gusta tu paisaje
 *             url_img: https://res.cloudinary.com/djtxchura/image/upload/v1697169941/aplicacionFotos/chwggqpngyumbgagxkrl.jpg
 *             id_url: aplicacionFotos/chwggqpngyumbgagxkrl
 *             user_id: 36
 *             fecha: 2023-10-12T05:00:00.000Z
 *             album_id: 7
 * 
 *
 *     '404':    # status code 
 *        description: no hay usuarios  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Not found     
 *     '401':    # status code 
 *        description:  pasar token de acceso  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Access denied                               
 */
router.get('/verImagesId/:id_user/:pagina/:cantidad', verifyToken, verImagenesId);

// Consulta una imagen
/**
 * @swagger
 * /verImage/{id_img}:
 *  get:
 *   summary: Muestra una imagen seleccionada por el id.
 *   security:
 *     - ApiKeyAuth: []
 *   tags: [Imagenes]   
 *   parameters:
 *     - in: path
 *       name: id_img
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *   description: Peticion para mostrar una imagen
 *   responses:
 *     '200':    # status code
 *        description: Muestra la imagen seleccionada con el id
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Imagenes'
 *           example:
 *             id_img: 51
 *             name_img: mi image
 *             description_img: me gusta tu paisaje
 *             url_img: https://res.cloudinary.com/djtxchura/image/upload/v1697169941/aplicacionFotos/chwggqpngyumbgagxkrl.jpg
 *             id_url: aplicacionFotos/chwggqpngyumbgagxkrl
 *             user_id: 36
 *             fecha: 2023-10-12T05:00:00.000Z
 *             album_id: 7
 * 
 *
 *     '404':    # status code 
 *        description: no hay usuarios  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Not found     
 *     '401':    # status code 
 *        description:  pasar token de acceso  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Access denied                               
 */
router.get('/verImage/:id_img', verifyToken, verImage);

// Consulta 4 imagenes para portada de album 
/**
 * @swagger
 * /verImagenesAlbum/{album_id}:
 *  get:
 *   summary: Muestra 4 imagenes para portada de album enviando  id de album.
 *   security:
 *     - ApiKeyAuth: []
 *   tags: [Imagenes]   
 *   parameters:
 *     - in: path
 *       name: album_id
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *   description: Peticion para mostrar una imagen
 *   responses:
 *     '200':    # status code
 *        description: Responde Array de imagenes
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Imagenes'
 *           example:
 *             id_img: 51
 *             name_img: mi image
 *             description_img: me gusta tu paisaje
 *             url_img: https://res.cloudinary.com/djtxchura/image/upload/v1697169941/aplicacionFotos/chwggqpngyumbgagxkrl.jpg
 *             id_url: aplicacionFotos/chwggqpngyumbgagxkrl
 *             user_id: 36
 *             fecha: 2023-10-12T05:00:00.000Z
 *             album_id: 7
 * 
 *
 *     '404':    # status code 
 *        description: no hay usuarios  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Not found     
 *     '401':    # status code 
 *        description:  pasar token de acceso  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Access denied                               
 */
router.get('/verImagenesAlbum/:album_id', verifyToken, verImagesAlbum);

// Consulta todas imagenes de album 
/**
 * @swagger
 * /verAllImagenesAlbum/{album_id}:
 *  get:
 *   summary: Muestra tpdas imagenes de album enviando  id de album.
 *   security:
 *     - ApiKeyAuth: []
 *   tags: [Imagenes]   
 *   parameters:
 *     - in: path
 *       name: album_id
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *   description: Peticion para mostrar una imagen
 *   responses:
 *     '200':    # status code
 *        description: Responde Array de imagenes
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Imagenes'
 *           example:
 *             id_img: 51
 *             name_img: mi image
 *             description_img: me gusta tu paisaje
 *             url_img: https://res.cloudinary.com/djtxchura/image/upload/v1697169941/aplicacionFotos/chwggqpngyumbgagxkrl.jpg
 *             id_url: aplicacionFotos/chwggqpngyumbgagxkrl
 *             user_id: 36
 *             fecha: 2023-10-12T05:00:00.000Z
 *             album_id: 7
 * 
 *
 *     '404':    # status code 
 *        description: no hay usuarios  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Not found     
 *     '401':    # status code 
 *        description:  pasar token de acceso  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Access denied                               
 */
router.get('/verAllImagenesAlbum/:album_id', verifyToken, verAllImagesAlbum);

// inserta una imagen 
/**
 * @swagger
 * /addImage/{id_user}:
 *  post:
 *   summary: Agrega una imagen a la base de datos y relaciona con el usuario
 *   security:
 *     - ApiKeyAuth: []
 *   tags: [Imagenes]  
 *   description: Peticion para agregar una imagen 
 *   parameters:
 *     - name: id_user
 *       in: path
 *       description: ID de usuario
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *   requestBody:
 *     content:
 *       multipart/form-data:
 *         schema:
 *           type: object
 *           properties:
 *             name_img:
 *               type: string
 *             description_img:
 *               type: string
 *             album_id:
 *               type: integer
 *             image:
 *               type: string
 *               format: binary
 *           example:
 *             name_img: image 1   
 *   responses:
 *     '200':    # status code
 *        description: Lista de imagenes de usuario
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Imagenes'
 *           example:
 *             id_img: 51
 *             name_img: mi image
 *             description_img: me gusta tu paisaje
 *             url_img: https://res.cloudinary.com/djtxchura/image/upload/v1697169941/aplicacionFotos/chwggqpngyumbgagxkrl.jpg
 *             id_url: aplicacionFotos/chwggqpngyumbgagxkrl
 *             user_id: 36
 *             fecha: 2023-10-12T05:00:00.000Z
 *             album_id: 7
 *     '404':    # status code 
 *        description: no hay usuarios  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Not found     
 *     '401':    # status code 
 *        description:  pasar token de acceso  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Access denied                               
 */
router.post('/addImage/:id_user', verifyToken, fileUpload({
    useTempFiles: true,
    tempFileDir: './src/uploads'
}), addImage);

// ver imagen
/**
 * @swagger
 * /verImage/{id_img}:
 *  get:
 *   summary: Muestra una imagen seleccionada por el id.
 *   security:
 *     - ApiKeyAuth: []
 *   tags: [Imagenes]   
 *   parameters:
 *     - in: path
 *       name: id_img
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *   description: Peticion para mostrar una imagen
 *   responses:
 *     '200':    # status code
 *        description: Muestra la imagen seleccionada con el id
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Imagenes'
 *           example:
 *             id_img: 51
 *             name_img: mi image
 *             description_img: me gusta tu paisaje
 *             url_img: https://res.cloudinary.com/djtxchura/image/upload/v1697169941/aplicacionFotos/chwggqpngyumbgagxkrl.jpg
 *             id_url: aplicacionFotos/chwggqpngyumbgagxkrl
 *             user_id: 36
 *             fecha: 2023-10-12T05:00:00.000Z
 *             album_id: 7
 * 
 *
 *     '404':    # status code 
 *        description: no hay usuarios  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Not found     
 *     '401':    # status code 
 *        description:  pasar token de acceso  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Access denied                               
 */
router.get('/verImage/:id_img', verifyToken, verImage);

// actualiza image
/**
 * @swagger
 * /updateImage/{id_img}:
 *  post:
 *   summary: elimina una imagen con el id_img
 *   security:
 *     - ApiKeyAuth: []
 *   tags: [Imagenes]  
 *   description: Peticion para agregar una imagen 
 *   parameters:
 *     - name: id_img
 *       in: path
 *       description: ID  de la imagen
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *   requestBody:
 *     content:
 *       multipart/form-data:
 *         schema:
 *           type: object
 *           properties:
 *             name_img:
 *               type: string
 *             description_img:
 *               type: string
 *             album_id:
 *               type: integer
 *             image:
 *               type: string
 *               format: binary
 *           example:
 *             name_img: image 1 
 * 
 *   responses:
 *     '200':    # status code
 *        description: Lista de imagenes de usuario
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/respuestaComun'
 *           example:
 *             status: 200
 *             message: 'Image delete successfully'
 *     '404':    # status code 
 *        description: no hay usuarios  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Not found     
 *     '401':    # status code 
 *        description:  pasar token de acceso  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Access denied                               
 */
router.post('/updateImage/:id_img', verifyToken, fileUpload({
    useTempFiles: true,
    tempFileDir: './src/uploads'
}), updateImage);

// inserta una imagen 
/**
 * @swagger
 * /deleteImage/{id_img}:
 *  delete:
 *   summary: elimina una imagen con el id_img
 *   security:
 *     - ApiKeyAuth: []
 *   tags: [Imagenes]  
 *   description: Peticion para agregar una imagen 
 *   parameters:
 *     - name: id_img
 *       in: path
 *       description: ID  de la imagen
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *   responses:
 *     '200':    # status code
 *        description: Lista de imagenes de usuario
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/respuestaComun'
 *           example:
 *             status: 200
 *             message: 'Image delete successfully'
 *     '404':    # status code 
 *        description: no hay usuarios  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Not found     
 *     '401':    # status code 
 *        description:  pasar token de acceso  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Access denied                               
 */
router.delete('/deleteImage/:id_img', verifyToken, deleteImagen);

export default router;