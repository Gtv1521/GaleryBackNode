"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Librerias
// muestra las variables globales de la application

//muestra las peticiones hechas al servidior y la respuesta de peticion 
// import bodyParser from 'body-parser'; // lee peticiones http  
// comunicacion con mas servidores o apliacaciones
// Initialitation
const app = (0, _express.default)();
_dotenv.default.config();

// settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cors.default)());
// app.use(bodyParser.urlencoded({ extended: false }));
var _default = exports.default = app;