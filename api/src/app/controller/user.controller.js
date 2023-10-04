// componentes de aplicación
import pool from '../../config/dataBaseConect.js';

// consultar todos los Usuarios
const consultaUsers = async (req, res) => {
    try {
        const consultaUser = await pool.query(`SELECT * FROM User`);
        res.json(consultaUser);
    } catch (error) {
        res.send(error);
    }
}

//actualizar datos personales de usuario 
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, username, email } = req.body;


    } catch (error) {
        res.json({ error: 'User not found' });
    }
}

// eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const respuesta = await pool.query('select * from User where id = ?', id);
        if (respuesta.length === 0) {
            res.json({ error: 'User not found' });
        }
        const borrar = await pool.query('delete from User where id = ?', id);
        res.json({ status: 200, respuesta });
    } catch (error) {
        res.json({ status: 404, messagge: error.message });
    }
}

const updatePassword = async (req, res) => {

}

export { consultaUsers, deleteUser, updateUser, updatePassword }