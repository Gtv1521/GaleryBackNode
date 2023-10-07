"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mysql = _interopRequireDefault(require("mysql2"));
var _util = require("util");
var _llave = _interopRequireDefault(require("./llave.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// importamos las librerias de uso para la app 

// hacemos llamado a los datos de llave de la base 

const pool = _mysql.default.createPool(_llave.default);
// creamos la conexion a la base
pool.getConnection((err, connection) => {
  if (err) {
    // si nos da error que lo espesifique
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('DATABASE CONNECTION WAS CLOSED');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.log('DATABASE HAS TO MANY CONNECTIONS');
    }
    if (err.code === 'ECONNREFUSED') {
      console.log('DATABASE CONNECTIONS WAS REFUSED');
    }
  }
  // conexion exitosa con la base de datos
  if (connection) {
    connection.release();
  }
  console.log('Database is connected');
  return;
});
pool.query = (0, _util.promisify)(pool.query);
var _default = exports.default = pool;