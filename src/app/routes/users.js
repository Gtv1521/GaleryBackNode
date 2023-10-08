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
 * tags:
 *  name: Users
 *  description: Rutas de usuarios LOGIN Y SIGIN 
 */

/**
 * @swagger
 * /Users:
 *  get:
 *   summary: muestra todos los usuarios registrados.
 *   tags: [Users]    
 *   description: peticion de mostrar usuarios 
 *   requestBody:
 *     required: true
 *     content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'     
 *   responses:
 *     '200':    # status code
 *        description: Usuario creado satisfactoriamente 
 *        content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *     '404':    # status code 
 *        description: error del servidor                           
 */

router.get('/users', verifyToken, consultaUsers);

// actualiza datos de Usuario
router.put('/updateUser/:id', verifyToken, updateUser);

// actualiza contraseña
router.put('/updatePassword/:id', verifyToken, updatePassword);

// elimina usuario
router.delete('/deleteUser/:id', verifyToken, deleteUser);


export default router;