"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controller/user.controller.js");
var _acessToken = require("../helpers/acessToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Librerias

// componentes de aplicacion 

// Imported components

// Initialize Ruter
const router = _express.default.Router();

// rutas de consulta de usuarios 
router.get('/users', _acessToken.verifyToken, _userController.consultaUsers);

// actualiza datos de Usuario
router.put('/updateUser/:id', _acessToken.verifyToken, _userController.updateUser);

// actualiza contraseña
router.put('/updatePassword/:id', _acessToken.verifyToken, _userController.updatePassword);

// elimina usuario
router.delete('/deleteUser/:id', _acessToken.verifyToken, _userController.deleteUser);
var _default = exports.default = router;