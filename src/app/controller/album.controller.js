// componentes de aplicación
import pool from "../../config/dataBaseConect";

const buscaNombre = async (nombre, id) => {
    return await pool.query('select * from albunes where nombre_album = ? and user_id = ?', [nombre, id]);
}

// muestra todos los albunes de cada usuario
const albumsIdUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).json({ error: 'Envie un usuario' });
        } else {
            const result = await pool.query('select * from albunes where user_id = ?', [id]);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(200).json({ message: 'No hay albums creados' });
            }
        }
    } catch (error) {
        res.json({ error: 'Algo salio mal' });
    }
};

// muestra un album con el id
const albumId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).json({ error: 'Envie id de album' });
        } else {
            const result = await pool.query('select * from albunes where id_album = ?', [id]);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(200).json({ message: 'El album no existe' });
            }
        }
    } catch (error) {
        res.json({ error: 'algo salio mal' });
    }
};

// crea un nuevo album
const albumNew = async (req, res) => {
    try {
        const { id } = req.params; //id de usuario
        const { nombre } = req.body;
        if (!id || !nombre) {
            res.status(301).json({ error: 'Envie todos los datos' });
        } else {
            const check = await buscaNombre(nombre, id);
            if (check.length > 0) {
                res.json({ error: 'El album ya existe para este usuario' }).status(304);
            } else {
                const result = await pool.query(`INSERT INTO albunes 
                (nombre_album, user_id) VALUES (?,?)`, [nombre, id]);

                if (result.serverStatus === 2) {
                    res.status(200).json({ nombre_album: nombre, id_album: id });
                }
            }
        }
    } catch (error) {
        res.json({ error: 'Algo salio mal' });
    }
};

// muestra un album con el id
const updateAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        if (!id || !nombre) {
            res.status(404).json({ error: 'Envie todos los datos' });
        } else {
            const check = await buscaNombre(nombre, id); // verifica que no exista ese album
            if (check.length > 0) {
                const result = await pool.query('update albunes set nombre_album = ? where id_album = ?', [nombre, id]);
                if (result.serverStatus === 2) {
                    if (result.changedRows === 1) {
                        res.status(200).json({ id_album: id, nombre_album: nombre });
                    } else {
                        res.json({ message: 'el album ya tiene este nombre' }).status(304);
                    }
                } else {
                    res.status(200).json({ message: 'El album no existe' });
                }
            } else {
                res.status(404).json({ message: 'Un album ya tiene ese nombre' });
            }
        }
    } catch (error) {
        res.json({ error: 'algo salio mal' });
    }
};

// elimina un album con las imagenes
const deleteAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).json({ error: 'id Not Found' });
        } else {
            const delet = await pool.query(`DELETE FROM imagenes WHERE album_id = ?`, [id]);
            const result = await pool.query(`DELETE FROM albunes WHERE id_album = ?`, [id]);
            if (result.serverStatus === 2) {
                res.status(200).json({ message: 'album eliminado' });
            }
        }
    } catch (error) {
        res.json({ message: 'algo salio mal' });
    }
};


export { albumsIdUser, albumId, updateAlbum, albumNew, deleteAlbum };
