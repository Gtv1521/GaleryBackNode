"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.updatePassword = exports.deleteUser = exports.consultaUsers = void 0;
var _dataBaseConect = _interopRequireDefault(require("../../config/dataBaseConect.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// componentes de aplicación

// consultar todos los Usuarios
const consultaUsers = async (req, res) => {
  try {
    const consultaUser = await _dataBaseConect.default.query(`SELECT * FROM User`);
    res.json(consultaUser);
  } catch (error) {
    res.status(404).json(error);
  }
};

//actualizar datos personales de usuario 
exports.consultaUsers = consultaUsers;
const updateUser = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      nombre,
      username,
      email
    } = req.body;
    const updateUser = await _dataBaseConect.default.query(`update User 
            nombre = ?, userName = ?, email = ? where  id = ?`, [nombre, username, email, id]);
    res.json(updateUser, {
      message: 'User updated'
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

// eliminar un usuario
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const respuesta = await _dataBaseConect.default.query('select * from User where id = ?', id);
    if (respuesta.length === 0) {
      res.json({
        error: 'User not found'
      });
    }
    const borrar = await _dataBaseConect.default.query('delete from User where id = ?', id);
    res.json({
      status: 200,
      respuesta
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

// 
exports.deleteUser = deleteUser;
const updatePassword = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      nombre,
      username,
      email
    } = req.body;
    console.log(nombre, username, email);
    if (!nombre || !username || !email) {
      res.status(404).json({
        message: 'Datos incompletos'
      });
    } else {
      const datos = {
        nombre,
        userName: username,
        email
      };
      const updateUser = await _dataBaseConect.default.query(`update User set ? where id = ?`, [datos, id]);
      res.json({
        updateUser,
        message: 'user updated successfully'
      });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.updatePassword = updatePassword;