import pool from "../../config/dataBaseConect.js";
import { encrypt, comparar } from '../helpers/encriptado.js';
import { genereAcessToken } from '../helpers/acessToken.js';

const verifyUsername = async (username) => {
    return await pool.query(`select * from User where userName = ?`, username);
};

// registra un usuario
const logIn = async (req, res) => {
    try {
        const { nombre, username, email, password } = req.body;
        const passEncript = await encrypt(password);

        const exitUsername = await verifyUsername(username);
        if (exitUsername.length === 0) {
            const insertUser = await pool.query(`insert into 
                User (nombre, username, email, password) 
                values (?, ?, ?, ?)`,
                [nombre, username, email, passEncript]);

            if (insertUser.serverStatus === 2) {
                res.json({
                    id: insertUser.insertId, nombre: nombre,
                    password: password, username: username,
                    email: email, message: 'Nuevo usuario agregado'
                });
            } else {
                res.send('Error al insertar usuario')
            }
        } else {
            res.json({ status: 404, message: 'Username exist for other user' })
        }
    } catch (error) {
        res.json({ error: 'Algo fallo' });
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
                message: 'User authenticated',
                token: accessToken
            });
        } else {
            res.send({ status: 404, message: 'Datos no coinciden' });
        }

    } catch (error) {
        res.json({
            error: 'Algo salio mal'
        })
    }
};

export { logIn, sigIn }

