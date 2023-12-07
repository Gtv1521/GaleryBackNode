"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _acessToken = require("../helpers/acessToken.js");
var _albumController = require("../controller/album.controller.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//librerias 

// componentes de la aplicacion

/**
 * @swagger
 * tags:
 *  name: Albums
 *  description: Rutas de CRUD de imagenes  
 */ // iniciando estancias 
const router = _express.default.Router();
// todos los albums que tengan id de usuario
/**
 * @swagger
 * /albums/{id}:
 *  get:
 *   summary: Muestra los albums que tiene un usuario 
 *   security:
 *     - ApiKeyAuth: []
 *   tags: [Albums]  
 *   description: Peticion para mostrar los albums del usuario
 *   parameters:
 *     - name: id
 *       in: path
 *       description: ID de usuario
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *   responses:
 *     '200':    # status code
 *        description: Lista de albums de usuario
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/respuestaComun'
 *           example:
 *             id_album: 4
 *             nombre_album: Paraiso
 *             user_id: 1            
 * 
 *     '404':    # status code 
 *        description: No tiene agregados albums  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Not found     
 *     '401':    # status code 
 *        description:  Pasar token de acceso  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Access denied                               
 */
router.get('/albums/:id', _acessToken.verifyToken, _albumController.albumsIdUser);

// escoge un album con id de album
/**
 * @swagger
 * /album/{id}:
 *  get:
 *   summary: Muestra el album con el id de album
 *   security:
 *     - ApiKeyAuth: []
 *   tags: [Albums]  
 *   description: Peticion para mostrar el album del id 
 *   parameters:
 *     - name: id
 *       in: path
 *       description: ID del album
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *   responses:
 *     '200':    # status code
 *        description: Muestra album 
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/respuestaComun'
 *           example:
 *             id_album: 3
 *             nombre_album: album 2
 *             user_id: 1
 *     '404':    # status code 
 *        description:  No existe el album  
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
router.get('/album/:id', _acessToken.verifyToken, _albumController.albumId);

// crea un nuevo album
/**
 * @swagger
 * /albumNew/{id}:
 *  post:
 *   summary: Agrega un album con el id de usuario
 *   security:
 *     - ApiKeyAuth: []
 *   tags: [Albums]  
 *   description: Peticion para agregar un album 
 *   parameters:
 *     - name: id
 *       in: path
 *       description: ID del usuario 
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *   requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *           example:
 *             nombre: Paraiso 
 *   responses:
 *     '200':    # status code
 *        description: Album agregado
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/respuestaComun'
 *           example:
 *             nombre_album: Paraiso
 *             id_user: 1 
 *             message: Album added successfully 
 *     '404':    # status code 
 *        description: No tiene album creados   
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Not found     
 *     '401':    # status code 
 *        description:  Pasar token de acceso  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Access denied                               
 */
router.post('/albumNew/:id', _acessToken.verifyToken, _albumController.albumNew);

// actualiza un album con id de album
/**
 * @swagger
 * /updateAlbum/{id}:
 *  put:
 *   summary: Actualiza el nombre del album
 *   security:
 *     - ApiKeyAuth: []
 *   tags: [Albums]  
 *   description: Peticion para actualizar el nombre del album
 *   parameters:
 *     - name: id
 *       in: path
 *       description: ID del album
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *   requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *           example:
 *             nombre: Paraiso 
 *   responses:
 *     '200':    # status code
 *        description: Album actualizado 
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/respuestaComun'
 *           example:
 *             status: 200
 *             message: album update successfilly
 * 
 *     '404':    # status code 
 *        description: No hay usuarios  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Not found     
 *     '401':    # status code 
 *        description:  Pasar token de acceso  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Access denied                               
 */
router.put('/updateAlbum/:id', _acessToken.verifyToken, _albumController.updateAlbum);

// elimina un album con id de album
/**
 * @swagger
 * /deleteAlbum/{id}:
 *  delete:
 *   summary: Elimina un album con el id de album
 *   security:
 *     - ApiKeyAuth: []
 *   tags: [Albums]  
 *   description: Peticion para eliminar un album 
 *   parameters:
 *     - name: id
 *       in: path
 *       description: ID del album
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *   responses:
 *     '200':    # status code
 *        description: Album delete successfully 
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/respuestaComun'
 *           example:
 *             status: 200
 *             message: 'Album delete successfully'
 *     '404':    # status code 
 *        description: No se pudo eliminar  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Not found     
 *     '401':    # status code 
 *        description:  Pasar token de acceso  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Access denied                               
 */
router.delete('/deleteAlbum/:id', _acessToken.verifyToken, _albumController.deleteAlbum);
var _default = exports.default = router;