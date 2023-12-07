// librerias
import dotenv from 'dotenv';

// componentes de aplicación
import pool from "../../config/dataBaseConect.js";
import { encrypt, comparar } from '../helpers/encriptado.js';
import { genereAcessToken, generePassToken } from '../helpers/acessToken.js';
import { transporter } from '../helpers/settings.email.js';

// iniciando estancias
dotenv.config();

// verifica Username en DB
const verifyUsername = async (username) => {
    return await pool.query(`SELECT * FROM usuarios WHERE userName = ?`, [username]);
};
// verifica email en DB
const verifyEmail = async (email) => {
    return await pool.query(`SELECT * FROM usuarios WHERE email = ?`, [email]);
};
// verifica que el usuario exista
const verifyId = async (id) => {
    return await pool.query(`SELECT * FROM usuarios WHERE id_user = ?`, [id]);
};

const username = async (req, res) => {
    try {
        const { user } = req.params
        const result = await verifyUsername(user)
        res.json(result[0])
    } catch (error) {
        res.json(error)
    }
}

const email = async (req, res) => {
    try {
        const { email } = req.params
        const result = await verifyEmail(email)
        res.json(result[0])
    } catch (error) {
        res.json(error)
    }
}

// registra un usuario
const logIn = async (req, res) => {
    try {
        const { nombre, username, email, password } = req.body;
        if (!nombre || !username || !password || !email) {
            res.json({ status: 404, message: 'send all data' })
        } else {
            const passEncript = await encrypt(password);

            const exitUsername = await verifyUsername(username);
            const exitEmail = await verifyEmail(email);
            if (exitUsername.length === 0) {
                if (exitEmail.length === 0) {
                    const insertUser = await pool.query(`INSERT INTO 
                usuarios (nombre_user, userName, email, password) 
                VALUES (?, ?, ?, ?)`,
                        [nombre, username, email, passEncript]);

                    if (insertUser.serverStatus === 2) {
                        const user = {
                            username: username, user_id: insertUser.insertId,
                            email: email, nombre: nombre
                        }
                        const accessToken = genereAcessToken(user);
                        res.header('Authorization', accessToken).json({
                            id: insertUser.insertId, nombre: nombre,
                            password: password, username: username,
                            email: email, message: 'New user added',
                            message: 'User authenticated',
                            token: accessToken
                        });

                    } else {
                        res.send('user insert failed');
                    }
                } else {
                    res.status(404).json({ message: 'Email is user: ' + exitEmail[0].userName });
                }
            } else {
                res.status(404).json({ message: 'Username exist for other user' })
            }
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
        const { nombre_user, id_user, email } = verifyPass[0];
        if (checkPass) {
            const user = { username: username, user_id: id_user, email: email, nombre: nombre_user }
            const accessToken = genereAcessToken(user);
            res.header('Authorization', accessToken).json({
                id: id_user, 
                wellcome: `Wellcome ${nombre_user}`,
                message: 'User authenticated',
                token: accessToken
            });
        } else {
            res.status(404).json({ message: 'Mismatched data' });
        }

    } catch (error) {
        res.status(404).json(error)
    }
};

// envia email
const sendEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(404).json({ message: 'Send an email to continue' });
        } else {
            const result = await verifyEmail(email);
            if (result.length === 0) {
                res.status(404).json({ message: 'Email not exit in the database' });
            } else {
                const user = { username: result[0].userName, id: result[0].id }
                const token = generePassToken(user);
                let urlPassNew = `${process.env.API}/newPassword/${token}`;
                const id = result[0].id;
                await transporter.sendMail({
                    from: `${process.env.USERMAIL}`, // sender address
                    to: `${email}`, // list of receivers
                    subject: `Forgot password <${process.env.USERMAIL}>`, // Subject line
                    html: `
                <b> Pleace click on the following link, or paste this into your browser to complete the process: </b>
                <a href="${urlPassNew}/${id}">${urlPassNew}/${id}</a>
                `, // html body
                });
                res.status(200).json({ email: email, message: 'Link send email' });
            }
        }
    } catch (error) {
        res.json(error);
    }
};


const passNew = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, confirPass } = req.body;
        if (password === confirPass) {
            const user = await verifyId(id);
            const verificar = await comparar(password, user[0].password)
            if (!verificar) {
                const encriptado = await encrypt(password);
                const result = await pool.query('UPDATE usuarios SET password = ? WHERE id_user = ?', [encriptado, id]);
                if (result.serverStatus === 2) {
                    res.status(200).json({ message: 'password updated successfully' })
                } else {
                    res.status(404).json({ message: 'update password failed' })
                }
            } else {
                res.json({ message: 'current password is this' });
            }
        } else {
            res.json({ message: 'Passwords do not match' });
        }
    } catch (error) {
        res.json(error);
    }
};

export { logIn, sigIn, sendEmail, passNew, verifyEmail, email, username, verifyUsername, verifyId }

