// librerias 
import fs from 'fs-extra';

// componentes de la aplicación
import pool from "../../config/dataBaseConect.js";
import { fotoUpload, fotoDelete } from '../../config/cloudinary.js';

// consulta de imagenes por id
const consultaImg = async (id) => {
    return await pool.query('SELECT * FROM imagenes WHERE id_img = ?', [id]);
};

// consulta id de album y que pertenece al usuario
const verAlbum = async (album_id, user_id) => {
    return await pool.query('SELECT * FROM albums WHERE id_album = ?  and user_id = ?', [album_id, user_id]);
};

// agregar imagen POST
const addImage = async (req, res) => {
    try {
        const { id_user } = req.params;
        const { name_img, description_img, album_id } = req.body;
        let url_img = '';
        let id_url = '';
        // insertamos la imagen en la DB
        if (!name_img || !description_img || !album_id) {
            res.status(404).json({ message: "Send all data" });
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
            const verifyAlbum = await verAlbum(album_id, id_user)
            if (verifyAlbum.length === 0) {
                res.json({ message: 'Album no exists' });
            } else {
                const imagenConsulta = await pool.query(`
                    INSERT INTO imagenes
                    (name_img, description_img, url_img, user_id, id_url, album_id, fecha)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [name_img, description_img, url_img, id_user, id_url, album_id, fecha]);

                //validamos que la respuesta sea correcta 
                if (imagenConsulta.serverStatus == 2) {
                    res.status(200).json({
                        id: imagenConsulta.insertId, nombre: name_img,
                        descripcion: description_img, url: url_img, id_url: id_url, album: album_id, fecha: fecha, message: 'add image successfully'
                    });
                } else {
                    res.json({ message: 'Add image failed' });
                }
            }
        }
    } catch (error) {
        res.status(404).json(error);
    }
};

// ver una imagen por id Imagen GET
const verImage = async (req, res) => {
    try {
        const { id_img } = req.params;
        const result = await consultaImg(id_img);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error);
    }
};

// ver imagenes por Usuario GET
const verImagenesId = async (req, res) => {
    try {
        const { id_user } = req.params;
        const consutaImagenes = await pool.query(`SELECT * FROM imagenes WHERE user_id = ?`, [id_user]);
        if (consutaImagenes.length !== 0) {
            res.json(consutaImagenes);
        } else {
            res.json({ message: 'There are no images to show' });
        }
    } catch (error) {
        res.json(error);
    }
}

// elimiar imagen DELETE
const deleteImagen = async (req, res) => {
    try {
        const { id_user } = req.params;
        const id_url = await consultaImg(id); 
        const respuesta = await pool.query('DELETE FROM imagenes WHERE id_img = ?', [id_user]);
        if (respuesta.serverStatus === 2 && respuesta.affectedRows > 0) {
            const foto = await fotoDelete(id_url[0].id_url);
            res.json({ message: 'Image delete successfully' });
        } else {
            res.json({ message: 'Image no exist' });
        }
    } catch (error) {
        res.status(404).json(error);
    }
};

// actualizar datos de imagen UPDATE
const updateImage = async (req, res) => {
    try {
        const { id_img } = req.params;
        const { name_img, description_img, album_id } = req.body;
        // capturamos la fecha 
        const tiempo = Date.now();
        const fecha = new Date(tiempo);
        // const fecha = hoy.toDateString();
        const updateUser = await pool.query(`UPDATE imagenes SET
             name_img = ?, description_img = ?, fecha = ?, album_id = ? WHERE id_img = ?`,
            [name_img, description_img, fecha , album_id, id_img]);
        if (updateUser.serverStatus === 2 && updateUser.changedRows === 1) {
            res.json({ updateUser, message: 'User updated' });   
        } else {
            res.json({ message: 'There are no changes to the object' });
        }
    } catch (error) {
        res.json(error);
    }
}

export { addImage, deleteImagen, verImage, verImagenesId, updateImage }