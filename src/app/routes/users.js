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
 *    ErrorAuth:
 *     '401':    # status code 
 *        description: Access denied   
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
 *        description: Usuario creado satisfactoriamente 
 *        content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 nombre:
 *                   type: string
 *                   description: contiene el nombre de usuario   
 *               example:
 *                 nombre: Gustao Bernal                   
 *     '404':    # status code 
 *        description: no hay usuarios                            
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
 */
router.put('/updatePassword/:id', verifyToken, updatePassword);

// elimina usuario
/**
 * @swagger
 * /deleteUser/{id}:
 *   delete:
 *    summary: Actualiza la contraseña  de usuario
 *    security:
 *      - ApiKeyAuth: [] 
 *    tags: [Users]
 */
router.delete('/deleteUser/:id', verifyToken, deleteUser);


export default router;