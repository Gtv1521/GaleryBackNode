// componentes de aplicación
import pool from '../../config/dataBaseConect.js';
import { comparar, encrypt } from '../helpers/encriptado.js';
import { verifyId } from './auth.controller.js';

// consultar todos los Usuarios
const consultaUsers = async (req, res) => {
    try {
        const consultaUser = await pool.query(`SELECT * FROM User`);
        if (consultaUser.length > 0) {
            res.status(200).json(consultaUser);
        } else {
            res.status(404).json({ message: 'No hay usuarios' });
        }

    } catch (error) {
        res.json(error);
    }
}

//actualizar datos personales de usuario 
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, username, email } = req.body;
        const checkPass = await verifyId(id)
        if (checkPass.length > 0) {
            if (!nombre || !username || !email) {
                res.json({ error: 'Inserte todos los datos' }).status(304);
            } else {
                const updateUser = await pool.query(`UPDATE User 
             SET nombre = ?, email = ?, userName = ? WHERE id = ?`,
                    [nombre, email, username, id]);
                if (updateUser.serverStatus === 2) {
                    res.status(200).json({ updateUser, message: 'User updated' });
                } else {
                    res.json({ message: 'no se pudo actalizar' });
                }
            }
        } else {
            res.status(404).json({ error: 'id no existe' });
        }
    } catch (error) {
        res.json(error);
    }
}

// eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const respuesta = await pool.query('select * from User where id = ?', id);
        if (respuesta.length == 0) {
            console.log('error');
            res.status(404).json({ error: 'User not found' });
        } else {
            const borrar = await pool.query('delete from User where id = ?', id);
            res.json({ status: 200, respuesta, message: 'Usuario eliminado satisfactoriamente' });
        }
    } catch (error) {
        res.json(error);
    }
}

// 
const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password_antiguo, password_nuevo } = req.body;
        if (password_antiguo === password_nuevo) {
            res.json({ error: 'The passwords are the same' }).status(304);
        } else {
            if (!password_nuevo || !password_antiguo) {
                res.status(404).json({ message: 'Enter all fields' });
            } else {
                const result = await pool.query('select * from User where id = ?', [id])
                const checkPass = await comparar(password_antiguo, result[0].password);
                if (checkPass) {
                    const passEncript = await encrypt(password_nuevo);
                    const updateUser = await pool.query(`update User set password = ? where id = ?`, [passEncript, id]);
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
        }
    } catch (error) {
        res.json(error);
    }
}

export { consultaUsers, deleteUser, updateUser, updatePassword }