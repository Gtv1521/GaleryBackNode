"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUsername = exports.verifyId = exports.verifyEmail = exports.sigIn = exports.logIn = void 0;
var _dataBaseConect = _interopRequireDefault(require("../../config/dataBaseConect.js"));
var _encriptado = require("../helpers/encriptado.js");
var _acessToken = require("../helpers/acessToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// componentes de aplicación

// verifica Username en DB
const verifyUsername = async username => {
  return await _dataBaseConect.default.query(`select * from User where userName = ?`, [username]);
};
// verifica email en DB
exports.verifyUsername = verifyUsername;
const verifyEmail = async email => {
  return await _dataBaseConect.default.query(`select * from User where email = ?`, [email]);
};
// verifica que el usuario exista
exports.verifyEmail = verifyEmail;
const verifyId = async id => {
  return await _dataBaseConect.default.query(`select * from User where id = ?`, [id]);
};

// registra un usuario
exports.verifyId = verifyId;
const logIn = async (req, res) => {
  try {
    const {
      nombre,
      username,
      email,
      password
    } = req.body;
    const passEncript = await (0, _encriptado.encrypt)(password);
    const exitUsername = await verifyUsername(username);
    const exitEmail = await verifyEmail(email);
    if (exitUsername.length === 0) {
      if (exitEmail.length === 0) {
        const insertUser = await _dataBaseConect.default.query(`insert into 
                User (nombre, userName, email, password) 
                values (?, ?, ?, ?)`, [nombre, username, email, passEncript]);
        if (insertUser.serverStatus === 2) {
          const user = {
            username: username,
            user_id: insertUser.insertId,
            email: email,
            nombre: nombre
          };
          const accessToken = (0, _acessToken.genereAcessToken)(user);
          res.header('Authorization', accessToken).json({
            id: insertUser.insertId,
            nombre: nombre,
            password: password,
            username: username,
            email: email,
            message: 'Nuevo usuario agregado',
            message: 'User authenticated',
            token: accessToken
          });
        } else {
          res.send('Error al insertar usuario');
        }
      } else {
        res.status(404).json({
          message: 'email es del usuario: ' + exitEmail[0].userName
        });
      }
    } else {
      res.status(404).json({
        message: 'Username exist for other user'
      });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

// inicia sesion y crea token
exports.logIn = logIn;
const sigIn = async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;
    const verifyPass = await verifyUsername(username);
    const checkPass = await (0, _encriptado.comparar)(password, verifyPass[0].password);
    const {
      nombre,
      id,
      email
    } = verifyPass[0];
    if (checkPass) {
      const user = {
        username: username,
        user_id: id,
        email: email,
        nombre: nombre
      };
      const accessToken = (0, _acessToken.genereAcessToken)(user);
      res.header('Authorization', accessToken).json({
        message: 'User authenticated',
        token: accessToken
      });
    } else {
      res.status(404).json({
        message: 'Datos no coinciden'
      });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.sigIn = sigIn;