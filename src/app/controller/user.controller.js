// componentes de aplicación
import pool from '../../config/dataBaseConect.js';
import { comparar, encrypt } from '../helpers/encriptado.js';
import { verifyId, verifyUsername } from './auth.controller.js';

// consultar todos los Usuarios
const consultaUsers = async (req, res) => {
    try {
        const consultaUser = await pool.query(`SELECT * FROM usuarios`);
        if (consultaUser.length > 0) {
            res.status(200).json(consultaUser);
        } else {
            res.status(404).json({ message: 'There are no users' });
        }

    } catch (error) {
        res.json(error);
    }
}
const consultarUser = async (req, res) => {
    try {
        const { id } = req.params
        const consultaUser = await pool.query(`SELECT * FROM usuarios WHERE id_user = ?`, [id]);
        if (consultaUser.length > 0) {
            res.status(200).json(consultaUser);
        } else {
            res.status(404).json({ message: 'There are no users' });
        }

    } catch (error) {
        res.json(error);
    }
}
// actualiza usuario con los datos que se le pasan
const updateUsuario = async (nombre, username, id) => {
    return await pool.query(`UPDATE usuarios 
        SET nombre_user = ?, userName = ? WHERE id_user = ?`,
        [nombre, username, id]);
}

//  update email of user with id user
const updateMail = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;

        if (!id || !email) {
            res.json({ message: 'send all data' });
        } else {
            const result = await pool.query('UPDATE usuarios SET email = ? WHERE id_user = ?', [email, id]);
            if (result.serverStatus === 2 && result.changedRows === 1) {
                res.json({ status: 200, message: 'Email updated successfully' });
            } else {
                res.json({ message: 'Update failed' });
            }
        }

    } catch (error) {
        res.status(404).json(error);
    }
}

//actualizar datos personales de usuario 
const updateUser = async (req, res) => {
    try {
        // recojemos los datos 
        const { id } = req.params;
        const { nombre, username } = req.body;

        // verificamos que exista
        const checkPass = await verifyId(id);
        const user = await verifyUsername(username);
        // los actualizamos despendiendo del caso 
        if (checkPass.length > 0) {
            if (!nombre || !username) {
                res.json({ error: 'Send all data' });
            } else if (user.length === 0) {
                const updateUser = await updateUsuario(nombre, username, id);
                if (updateUser.serverStatus === 2 && updateUser.changedRows === 1) {
                    res.status(200).json({ status: 200, message: 'User updated' });
                } else {
                    res.json({ message: 'There are no changes to the object' });
                }
            } else if (user[0].id === parseInt(id)) {
                const updateUser = await updateUsuario(nombre, username, id);
                if (updateUser.serverStatus === 2 && updateUser.changedRows === 1) {
                    res.json({ status: 200, message: 'User updated' });
                } else {
                    res.json({ message: 'There are no changes to the object' });
                }
            } else {
                res.json({ message: 'The username exists for another user' });
            }
        } else {
            res.status(404).json({ error: 'id no exists' });
        }
    } catch (error) {
        res.json(error);
    }
}

// delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const respuesta = await pool.query('SELECT * FROM usuarios WHERE id_user = ?', id);
        if (respuesta.length == 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            const borrar = await pool.query('DELETE FROM usuarios WHERE id_user = ?', id);
            res.json({ status: 200, message: 'User delete successfully' });
        }
    } catch (error) {
        res.json(error);
    }
}

// update password
const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { passwordAntiguo, passwordNuevo } = req.body;
        if (passwordAntiguo === passwordNuevo) {
            res.json({ error: 'The passwords are the same' }).status(304);
        } else if (!passwordNuevo || !passwordAntiguo) {
            res.status(404).json({ message: 'Enter all fields' });
        } else {
            const result = await pool.query('SELECT * FROM usuarios WHERE id_user = ?', [id])
            const checkPass = await comparar(passwordAntiguo, result[0].password);
            if (checkPass) {
                const passEncript = await encrypt(passwordNuevo);
                const updateUser = await pool.query(`UPDATE usuarios SET password = ? WHERE id_user = ?`, [passEncript, id]);
                if (updateUser.serverStatus === 2) {
                    const respuesta = await verifyId(id);
                    res.status(200).json({ status: 200, message: 'Password updated successfully' });
                } else {
                    res.json({ message: 'Could not udpate' });
                }
            } else {
                res.json({ error: 'Pasword old incorrect' }).status(304);
            }
        }
    } catch (error) {
        res.json(error);
    }
}

export { consultaUsers, consultarUser, deleteUser, updateMail, updateUser, updatePassword }