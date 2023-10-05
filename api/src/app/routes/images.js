// Librerias
import express from 'express';

// componentes de aplicación
import pool from '../../config/dataBaseConect.js';
import { verifyToken } from '../helpers/acessToken.js';
import { addImage, deleteImagen } from '../controller/imagenes.cotroller.js';


// Inicialitation Rutas
const router = express.Router();


// UTILIZANDO RUTAS Y CONSULTAS
// Consulta todas las imagenes
router.get('/images', verifyToken, async (req, res, next) => {
    try {
        const consutaImagenes = await pool.query(`select * from imagenes`);
        if (consutaImagenes.length !== 0) {
            res.json(consutaImagenes);
        } else {
            res.json({ message: 'No hay imagenes para mostrar' });
        }
    } catch (error) {
        res.send(error);
        res.json({ error: error.message });
    }
});

// Consulta una imagen
router.get('/imagen/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const imagenConsulta = await pool.query('select * from imagenes where id = ?', id);
    res.json(imagenConsulta);
});

// inserta una imagen 
router.post('/addImage/:id',verifyToken, addImage);

// borrar imagen
router.delete('/deleteImage/:id', deleteImagen)

export default router;