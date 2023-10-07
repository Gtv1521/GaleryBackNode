"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _authControler = require("../controller/auth.controler.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Librerias

// Estancias de la app

// iniciando estancias
const router = _express.default.Router();
_dotenv.default.config();

// form sigIn
router.get('/formSigin', async (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>

        <body>
            <form action="/sigin" method="POST" id="formUser">
                <input type="text" name="username" placeholder="Username"><br>
                <input type="password" name="password" placeholder="password">
                <input type="submit" value="Entrar">
            </form>
        </body>
    `);
});

// form Login
router.get('/formLogin', async (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>

        <body>
            <form action="/login" method="POST" id="formUser">
                <input type="text" name="nombre" placeholder="Nombre" /><br>
                <input type="text" name="username" placeholder="Username" /><br>
                <input type="mail" name="email" placeholder="E-mail" /><br>
                <input type="password" name="password" placeholder="Pass" /><br>
                <input type="submit" value="Crear">
            </form>
        </body>
    `);
});

// log in ruta
router.post('/login', _authControler.logIn);

// sig in ruta
router.post('/sigin', _authControler.sigIn);
var _default = exports.default = router;