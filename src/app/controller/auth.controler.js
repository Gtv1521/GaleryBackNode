// componentes de aplicación
import pool from "../../config/dataBaseConect.js";
import { encrypt, comparar } from '../helpers/encriptado.js';
import { genereAcessToken } from '../helpers/acessToken.js';

// verifica Username en DB
const verifyUsername = async (username) => {
    return await pool.query(`select * from User where userName = ?`, [username]);
};
// verifica email en DB
const verifyEmail = async (email) => {
    return await pool.query(`select * from User where email = ?`, [email]);
};
// verifica que el usuario exista
const verifyId = async (id) => {
    return await pool.query(`select * from User where id = ?`, [id]);
};

// registra un usuario
const logIn = async (req, res) => {
    try {
        const { nombre, username, email, password } = req.body;
        const passEncript = await encrypt(password);

        const exitUsername = await verifyUsername(username);
        const exitEmail = await verifyEmail(email);
        if (exitUsername.length === 0) {
            if (exitEmail.length === 0) {
                const insertUser = await pool.query(`insert into 
                User (nombre, userName, email, password) 
                values (?, ?, ?, ?)`,
                    [nombre, username, email, passEncript]);

                if (insertUser.serverStatus === 2) {
                    const user = { username: username, user_id: insertUser.insertId, 
                                    email: email, nombre: nombre }
                    const accessToken = genereAcessToken(user);
                    res.header('Authorization', accessToken).json({         
                        id: insertUser.insertId, nombre: nombre,
                        password: password, username: username,
                        email: email, message: 'Nuevo usuario agregado',
                        message: 'User authenticated',
                        token: accessToken
                    });

                } else {
                    res.send('Error al insertar usuario')
                }
            } else {
                res.status(404).json({ message: 'email es del usuario: ' + exitEmail[0].userName });
            }
        } else {
            res.status(404).json({ message: 'Username exist for other user' })
        }
    } catch (error) {
        res.status(404).json(error);
    }
};

// inicia sesion y crea token
const sigIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const verifyPass = await verifyUsername(username);
        const checkPass = await comparar(password, verifyPass[0].password);
        const { nombre, id, email } = verifyPass[0];
        if (checkPass) {
            const user = { username: username, user_id: id, email: email, nombre: nombre }
            const accessToken = genereAcessToken(user);
            res.header('Authorization', accessToken).json({
                wellcome: `wellcome ${nombre}`,
                message: 'User authenticated',
                token: accessToken
            });
        } else {
            res.status(404).json({ message: 'Datos no coinciden' });
        }

    } catch (error) {
        res.status(404).json(error)
    }
};

export { logIn, sigIn, verifyEmail, verifyUsername, verifyId }

