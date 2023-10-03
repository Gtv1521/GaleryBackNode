// Librerias
import express from 'express';
import jwt from 'jsonwebtoken';

// Archivos importados de la app
import pool from '../../config/dataBaseConect.js';
import { verifyToken } from '../helpers/acessToken.js';


// Inicialitation Rutas
const router = express.Router();

 
// UTILIZANDO RUTAS Y CONSULTAS
// Consulta todas las imagenes
router.get('/image/:id', verifyToken, async (req, res, next) => {
    try {
        const consutaImagenes = await pool.query(`select * from imagenes`);
        if (consutaImagenes.length !== 0) {
        res.json(consutaImagenes);
        }else{
            res.json({message: 'No hay imagenes'});
        }
    } catch (error) {
        res.send(error);
        res.json({ error: error.message });
    }    
});

// Consulta una imagen
router.get('/images/:id', verifyToken, async (req, res) => {
    const id = req.body;
    const imagenConsulta = await pool.query('select * from imagenes where id = ?', id);
    res.json(imagenConsulta);
});

// inserta una imagen 
router.post('/image', verifyToken, async (req, res) => {
    const { name_img, description_img, url_img, username } = req.body;
    try {
        const imagenConsulta = await pool.query('insert into imegenes values (?,?,?,?)', [name_img, description_img, url_img, username]);
        res.json(imagenConsulta);
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});



export default router;