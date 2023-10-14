// componentes de aplicación
import pool from "../../config/dataBaseConect";

const buscaNombre = async (nombre, id) => {
    return await pool.query('SELECT * FROM albums WHERE nombre_album = ? and user_id = ?', [nombre, id]);
}

// muestra todos los albunes de cada usuario
const albumsIdUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).json({ error: 'Send a user' });
        } else {
            const result = await pool.query('SELECT * FROM albums WHERE user_id = ?', [id]);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(200).json({ message: 'No albums created' });
            }
        }
    } catch (error) {
        res.json({ error: 'Something went wrong' });
    }
};

// muestra un album con el id
const albumId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).json({ error: 'Send id of album' });
        } else {
            const result = await pool.query('SELECT * FROM albums WHERE id_album = ?', [id]);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(200).json({ message: 'The album does not exist' });
            }
        }
    } catch (error) {
        res.json({ error: 'Something went wrong' });
    }
};

// crea un nuevo album
const albumNew = async (req, res) => {
    try {
        const { id } = req.params; //id de usuario
        const { nombre } = req.body;
        if (!id || !nombre) {
            res.status(301).json({ error: 'Send all data' });
        } else {
            const check = await buscaNombre(nombre, id);
            if (check.length > 0) {
                res.json({ error: 'The album exists to this user' }).status(304);
            } else {
                const result = await pool.query(`INSERT INTO albums 
                (nombre_album, user_id) VALUES (?,?)`, [nombre, id]);

                if (result.serverStatus === 2) {
                    res.status(200).json({ nombre_album: nombre, id_user: id });
                }
            }
        }
    } catch (error) {
        res.json({ error: 'Something went wrong' });
    }
};

// muestra un album con el id
const updateAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        if (!id || !nombre) {
            res.status(404).json({ error: 'Send all data' });
        } else {
            const check = await buscaNombre(nombre, id); // verifica que no exista ese album
            if (check.length > 0) {
                const result = await pool.query('UPDATE albums SET nombre_album = ? WHERE id_album = ?', [nombre, id]);
                if (result.serverStatus === 2) {
                    if (result.changedRows === 1) {
                        res.status(200).json({ id_album: id, nombre_album: nombre });
                    } else {
                        res.json({ message: 'The album have this name' }).status(304);
                    }
                } else {
                    res.status(200).json({ message: 'The album does not exists' });
                }
            } else {
                res.status(404).json({ message: 'The album have this name' });
            }
        }
    } catch (error) {
        res.json({ error: 'Something went wrong' });
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
            const result = await pool.query(`DELETE FROM albums WHERE id_album = ?`, [id]);
            if (result.serverStatus === 2) {
                res.status(200).json({ message: 'Album delete' });
            }
        }
    } catch (error) {
        res.json({ message: 'Something went wrong' });
    }
};


export { albumsIdUser, albumId, updateAlbum, albumNew, deleteAlbum };
