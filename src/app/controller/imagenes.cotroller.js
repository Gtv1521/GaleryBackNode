// librerias 
import fs from 'fs-extra';

// componentes de la aplicación
import pool from "../../config/dataBaseConect.js";
import { fotoUpload, fotoDelete } from '../../config/cloudinary.js';

// agregar imagen 
const addImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_img, description_img } = req.body;
        let url_img = '';
        let id_url = '';
        // insertamos la imagen en la DB
        if (!name_img || !description_img) {
            res.status(404).json({ message: "debe llenar todos los campos..." });
        } else {
            if (req.files?.image) { //verifica que exista una imagen
                const result = await fotoUpload(req.files.image.tempFilePath); //sube a cloudinary
                url_img = result.secure_url; //saca la url de la imagen en la red 
                id_url = result.public_id; //nos da el id de la imagen en cloudinary
                await fs.remove('./src/uploads');
            }
            const imagenConsulta = await pool.query(`
            insert into imagenes (name_img, description_img, url_img, username, id_url) values (?, ?, ?, ?, ?)`,
                [name_img, description_img, url_img, id, id_url]);
            if (imagenConsulta.serverStatus === 2) {
                res.status(200).json({
                    id: imagenConsulta.insertId, nombre: name_img,
                    descripcion: description_img, url: url_img, id_url: id_url, message: 'add imege successfully'
                });
            }
        }
    } catch (error) {
        res.status(404).json(error);
    }
};

// ver una imagen
const verImage = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM imagenes WHERE id = ?`, id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error);
    }
};


// elimiar imagen
const deleteImagen = async (req, res) => {
    const { id } = req.body;

    console.log(id);
};

export { addImage, deleteImagen, verImage }