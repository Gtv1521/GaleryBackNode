//librerias 
import express from 'express'

// componentes de la aplicacion
import { verifyToken } from '../helpers/acessToken.js';
import { albumsIdUser, albumId, updateAlbum, albumNew, deleteAlbum } from '../controller/album.controller.js'

// iniciando estancias 
const router = express.Router();
// todos los albums que tengan id de usuario
router.get('/albums/:id', verifyToken, albumsIdUser );

// escoge un album con id de album
router.get('/album/:id', verifyToken, albumId );

// crea un nuevo album
router.post('/albumNew/:id', albumNew);

// actualiza un album con id de album
router.put('/updateAlbum/:id', updateAlbum);

// elimina un album con id de album
router.delete('/deleteAlbum/:id', deleteAlbum );

export default router;