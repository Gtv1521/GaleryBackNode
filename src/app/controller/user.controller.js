// componentes de aplicación
import pool from '../../config/dataBaseConect.js';

// consultar todos los Usuarios
const consultaUsers = async (req, res) => {
    try {
        const consultaUser = await pool.query(`SELECT * FROM User`);
        res.json(consultaUser);
    } catch (error) {
        res.status(404).json(error);
    }
}

//actualizar datos personales de usuario 
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, username, email } = req.body;

        const updateUser = await pool.query(`update User 
            nombre = ?, userName = ?, email = ? where  id = ?`,
            [nombre, username, email, id]);

        res.json(updateUser, { message: 'User updated' });

    } catch (error) {
        res.status(404).json(error);
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
        res.status(404).json(error);
    }
}

// 
const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, username, email } = req.body;
        console.log(nombre, username, email);

        if (!nombre || !username || !email) {
            res.status(404).json({ message: 'Datos incompletos' });
        } else {
            const datos = { nombre, userName: username, email };
            const updateUser = await pool.query(`update User set ? where id = ?`, [datos, id]);
            res.json({ updateUser, message: 'user updated successfully' });
        }
    } catch (error) {
        res.status(404).json(error);
    }
}

export { consultaUsers, deleteUser, updateUser, updatePassword }