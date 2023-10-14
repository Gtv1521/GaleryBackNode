// Librerias
import express from 'express';

// componentes de aplicacion 
import { consultaUsers, deleteUser, updateUser, updatePassword } from '../controller/user.controller.js';

// Imported components
import { verifyToken } from '../helpers/acessToken.js';

// Initialize Ruter
const router = express.Router();

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
router.get('/users', verifyToken, consultaUsers);

// actualiza datos de Usuario
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
 *      description: pase los datos de usuario a actualizar por medio del objeto.
 *      content:
 *        application/json:
 *          schema:    
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                nombre: 
 *                  type: string
 *                  description: nombre de suario
 *                username: 
 *                  type: string
 *                  description: nombre unico de suario 
 *              example:
 *                nombre: Gus Bernal
 *                username: gtv.312
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
 *             message: Inserte todos los datos   
*/   
router.put('/updateUser/:id', verifyToken, updateUser);

// actualiza contraseña   
/**
 * @swagger
 * /updatePassword/{id}:
 *   put:
 *    summary: Actualiza la contraseña  de usuario
 *    security:
 *      - ApiKeyAuth: [] 
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      description: Envie la contraseña antigua y la nueva para actualizar por medio del objeto.
 *      content:
 *        application/json:
 *          schema:    
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                passwordAntiguo: 
 *                  type: string
 *                  description: nombre de suario
 *                passwordNuevo: 
 *                  type: string
 *                  description: nombre unico de suario 
 *              example:
 *                passwordAntiguo: Gustavo.123
 *                passwordNuevo: gtv.312
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
router.put('/updatePassword/:id', verifyToken, updatePassword);

// elimina usuario
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
 *             message:  Usuario eliminado satisfactoriamente
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
router.delete('/deleteUser/:id', verifyToken, deleteUser);


export default router;