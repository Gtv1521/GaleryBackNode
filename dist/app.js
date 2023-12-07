"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _swagger = require("../swagger.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Librerias
// muestra las variables globales de la application

//muestra las peticiones hechas al servidior y la respuesta de peticion 
// comunicacion con mas servidores o apliacaciones
// Swagger API
//
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

// configuracion de swaggwer 
const specs = (0, _swaggerJsdoc.default)(_swagger.options);
app.use('/docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(specs));

// app.use(bodyParser.urlencoded({ extended: false }));
var _default = exports.default = app;