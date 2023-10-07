// librerias 
import fs from 'fs-extra';

// componentes de la aplicación
import pool from "../../config/dataBaseConect.js";
import { fotoUpload, fotoDelete } from '../../config/cloudinary.js';

// consulta de imagenes por id
const consultaImg = async (id) => {
    return await pool.query('SELECT * FROM imagenes WHERE id_img = ?', [id]);
};

// agregar imagen POST
const addImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_img, description_img, album } = req.body;
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
                await fs.remove(req.files.image.tempFilePath);
            }
            // capturamos la fecha 
            const tiempo = Date.now();
            const fecha = new Date(tiempo);
            // const fecha = hoy.toDateString();

            // insertamos los datos en la base de datos
            const imagenConsulta = await pool.query(`
            insert into imagenes
            (name_img, description_img, url_img, user_id, id_url, album, fecha)
            values (?, ?, ?, ?, ?, ?, ?)`,
                [name_img, description_img, url_img, id, id_url, album, fecha]);

            //validamos que la respuesta sea correcta 
            if (imagenConsulta.serverStatus === 2) {
                res.status(200).json({
                    id: imagenConsulta.insertId, nombre: name_img,
                    descripcion: description_img, url: url_img, id_url: id_url, album: album, fecha: fecha, message: 'add image successfully'
                });
            }
        }
    } catch (error) {
        res.status(404).json(error);
    }
};

// ver una imagen por id Imagen GET
const verImage = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await consultaImg(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error);
    }
};

// ver imagenes por Usuario GET
const verImagenesId = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const consutaImagenes = await pool.query(`SELECT * FROM imagenes WHERE user_id = ?`, [id]);
        if (consutaImagenes.length !== 0) {
            res.json(consutaImagenes);
        } else {
            res.json({ message: 'No hay imagenes para mostrar' });
        }
    } catch (error) {
        res.json(error);
    }
}

// elimiar imagen DELETE
const deleteImagen = async (req, res) => {
    try {
        const { id } = req.params;
        const id_url = await consultaImg(id);
        const respuesta = await pool.query('DELETE FROM imagenes WHERE id_img = ?', id);
        if (respuesta.serverStatus === 2 && respuesta.affectedRows > 0) {
            const foto = await fotoDelete(id_url[0].id_url);
            res.json({ message: 'Image delete successfully' });
        } else {
            res.json({ message: 'image no exist' });
        }
    } catch (error) {
        res.status(404).json(error);
    }
};

// actualizar datos de imagen
const updateImage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, username, email } = req.body;

        console.log(`respuesta ${nombre}`);
        next();
        // const updateUser = await pool.query(`update User 
        //     nombre = ?, userName = ?, email = ? where  id = ?`,
        //     [nombre, username, email, id]);

        // res.json(updateUser, { message: 'User updated' });

    } catch (error) {
        res.json(error);
    }
}
        
export { addImage, deleteImagen, verImage, verImagenesId, updateImage }