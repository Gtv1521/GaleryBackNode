"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controller/user.controller.js");
var _acessToken = require("../helpers/acessToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Librerias

// componentes de aplicacion 

// Imported components

// Initialize Ruter
const router = _express.default.Router();

// rutas de consulta de usuarios 
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth:        # arbitrary name for the security scheme
 *       type: apiKey
 *       in: header       # can be "header", "query" or "cookie"
 *       name: Authorization  
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Okay:
 *      type: object
 *      properties:
 *        status: 
 *           type: integer
 *           description: respuesta de estado ok
 *        respuesta:
 *           type: object
 *           description: consulta de usuario eliminado  
 *           properties:
 *             id: 
 *               type: integer
 *               description: id user
 *             nombre: 
 *               type: string
 *               description: nombre user
 *             username: 
 *               type: string
 *               description: username of user
 *             password: 
 *               type: string
 *               description: password of user
 *             email: 
 *               type: string
 *               description: email of user
 *        message: 
 *          type: string
 *          description: descripcion del message 
 * 
 *    Error:
 *      type: object
 *      properties:
 *        message: 
 *          type: string
 *          description: descripcion del error 
 * 
 *    
 *    respuestaComun:
 *      type: object
 *      properties:
 *        status: 
 *          type: integer
 *          description:  Numero de estado 
 *        message: 
 *          type: string
 *          description:  Descripcion del mensaje  
 * 
 *    Usuario:
 *      type: object
 *      properties:
 *         id: 
 *           type: integer
 *           description: id user
 *         nombre: 
 *           type: string
 *           description: nombre user
 *         username: 
 *           type: string
 *           description: username of user
 *         password: 
 *           type: string
 *           description: password of user
 *         email: 
 *           type: string
 *           description: email of user
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Rutas de CRUD de usuarios  
 */

/**
 * @swagger
 * /users:
 *  get:
 *   summary: Muestra todos los usuarios registrados.
 *   security:
 *     - ApiKeyAuth: []
 *   tags: [Users]    
 *   description: Peticion para mostrar usuarios
 *   responses:

 *     '200':    # status code
 *        description: Lista de usuarios
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Usuario'
 *           example:
 *             id: 36
 *             nombre: Gustavo
 *             username: Gustavo123
 *             password: $2a$10$Fj5GVZ0b0y8sKK5fxpR.fuPzycOXt6HN23FgbrY2sGzDdsugoHEka
 *             email: gustavober98@gmail.com
 * 
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
router.get('/users', _acessToken.verifyToken, _userController.consultaUsers);

// update data user 
/**
 * @swagger
 * /updateUser/{id}:
 *   put:
 *    summary: Actualiza datos de usuario
 *    security:
 *      - ApiKeyAuth: [] 
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 * 
 *    requestBody:
 *      required: true
 *      description: Pase los datos de usuario a actualizar por medio del objeto.
 *      content:
 *        application/json:
 *          schema:    
 *            type: object
 *            properties:
 *              nombre: 
 *                type: string
 *                description: Nombre de suario
 *              username: 
 *                type: string
 *                description: Nombre unico de suario 
 *            example:
 *              nombre: Gustavo Bernal
 *              username: gtv.312
 *    responses:
 *      200:
 *        description:  Datos de usuario actualizados
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/respuestaComun'
 *           example:
 *             status: 200
 *             message: User updated
 *                      
 *      401:    # status code 
 *        description:  Pasar token de acceso  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Access denied     
 *      404: 
 *        description: Error Not Found
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Send all data    
*/
router.put('/updateUser/:id', _acessToken.verifyToken, _userController.updateUser);

// update password   
/**
 * @swagger
 * /updatePassword/{id}:
 *   put:
 *    summary: Actualiza la contraseña  de usuario
 *    security:
 *      - ApiKeyAuth: [] 
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    requestBody:
 *      required: true
 *      description: Envie la contraseña antigua y la nueva para actualizar por medio del objeto.
 *      content:
 *        application/json:
 *          schema:    
 *            type: object
 *            properties:
 *              passwordAntiguo: 
 *                type: string
 *                description: nombre de suario
 *              passwordNuevo: 
 *                type: string
 *                description: nombre unico de suario 
 *            example:
 *              passwordAntiguo: Gustavo.123
 *              passwordNuevo: gtv.312
 *    responses:
 *      200:
 *        description:  Datos de usuario actualizados
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/respuestaComun'
 *           example:
 *              status: 200
 *              message: Password updated successfully 
 *         
 *      401:    # status code 
 *        description:  Pasar token de acceso  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Access denied 
 *     
 *      404: 
 *        description: Error Not Found
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Not found 
 */
router.put('/updatePassword/:id', _acessToken.verifyToken, _userController.updatePassword);

// update email
/**
 * @swagger
 * /updateEmail/{id}:
 *   put:
 *    summary: Actualiza la contraseña  de usuario
 *    security:
 *      - ApiKeyAuth: [] 
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    requestBody:
 *      required: true
 *      description: Envie la contraseña antigua y la nueva para actualizar por medio del objeto.
 *      content:
 *        application/json:
 *          schema:    
 *            type: object
 *            properties:
 *              email: 
 *                type: string
 *                description: Email nuevo
 *            example:
 *              email: gustavober98@gmail.com
 *    responses:
 *      200:
 *        description:  Datos de usuario actualizados
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/respuestaComun'
 *           example:
 *              status: 200
 *              message: Email updated successfully 
 *         
 *      401:    # status code 
 *        description:  Pasar token de acceso  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Access denied 
 *     
 *      404: 
 *        description: Error Not Found
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Not found 
 */
router.put('/updateEmail/:id', _acessToken.verifyToken, _userController.updateMail);

// delete user
/**
 * @swagger
 * /deleteUser/{id}:
 *   delete:
 *    summary: Elimina un usuario
 *    security:
 *      - ApiKeyAuth: [] 
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    responses:
 *      200: 
 *        description: Usuario eliminado 
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Okay'
 *           example:
 *             status: 200
 *             respuesta:
 *                id: 37
 *                nombre: Gustavo Bernal
 *                username: Gustavo.123
 *                password: $2a$10$Fj5GVZ0b0y8sKK5fxpR.fuPzycOXt6HN23FgbrY2sGzDdsugoHEka
 *                email: gustavo@algo.com
 *             message:  User delete successfully
 *      404: 
 *        description: Error Not Found
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: User not found 
 *      401:    # status code 
 *        description:  pasar token de acceso  
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             message: Access denied  
 * 
 */
router.delete('/deleteUser/:id', _acessToken.verifyToken, _userController.deleteUser);
var _default = exports.default = router;