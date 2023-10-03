// Librerias
import express from 'express';
import { consultaUsers, deleteUser } from '../controller/user.controller.js';

// Imported components
import { verifyToken } from '../helpers/acessToken.js';

// Initialize Ruter
const router = express.Router();

// rutas de consulta de usuarios 
router.get('/users', verifyToken, consultaUsers);
// actualiza datos de Usuario
router.put('/updateUser/:id', verifyToken);
// elimina usuario
router.delete('/deleteUser/:id', verifyToken, deleteUser);


export default router;