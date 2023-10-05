// Librerias
import express from 'express';

// componentes de aplicacion 
import { consultaUsers, deleteUser, updateUser, updatePassword } from '../controller/user.controller.js';

// Imported components
import { verifyToken } from '../helpers/acessToken.js';

// Initialize Ruter
const router = express.Router();

// rutas de consulta de usuarios 
router.get('/users', verifyToken, consultaUsers);

// actualiza datos de Usuario
router.put('/updateUser/:id', verifyToken, updateUser);

// actualiza contraseña
router.put('/updatePassword/:id', updatePassword);

// elimina usuario
router.delete('/deleteUser/:id', verifyToken, deleteUser);


export default router;