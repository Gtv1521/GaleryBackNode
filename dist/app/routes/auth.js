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
/**
 * @swagger
 * components:
 *  schemas:
 *    Userlogin:
 *      type: object
 *      properties:
 *        nombre: 
 *          type: string
 *          description: nombre del usuario
 *        username: 
 *          type: string
 *          description: nombre de usuario que sea unico
 *        password:
 *          type: password
 *          description: contraseña de usuario de registrado
 *        email:
 *          type: string
 *          description: email es unico en la app
 *      required: 
 *          - nombre
 *          - username
 *          - password
 *          - email  
 *      example:
 *          nombre: Gstavo Bernal
 *          username: Gustavo123
 *          password: gus.123
 *          email: correo@algo.com
 * 
 *            
 */

/**
 * @swagger
 * tags:
 *  name: Autenticacion
 *  description: Rutas de usuarios LOGIN Y SIGIN 
 */

/**
 * @swagger
 * /login:
 *  post:
 *   summary: crea un usuario nuevo.
 *   tags: [Autenticacion]    
 *   description: Crea un usuario y porporciona access token.
 *   requestBody:
 *     required: true
 *     content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Userlogin'     
 *   responses:
 *     '200':    # status code
 *        description: Usuario creado satisfactoriamente 
 *        content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Userlogin'
 *        links: 
 *          getUsers:
 *            operationId: getUsers 
 * 
 *     404:    # status code
 *        description: Error Not found
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  error: 
 *                    type: string
 *                    properties: mesaje de error 
 *                example:  
 *                  message: datos no coinciden 
 *   
 *                       
 *                          
 */
router.post('/login', _authControler.logIn);

// sig in ruta
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id: 
 *          type: integer
 *          description: numero de identificacion de usuario
 *        username: 
 *          type: string
 *          description: nombre de usuario de registrado
 *        password:
 *          type: password
 *          description: contraseña de usuario de registrado  
 *      required: 
 *          - username
 *          - password
 *      example:
 *          id: 20
 *          username: Gustavo123
 *          password: gus.123
 * 
 *            
 */

/**
 * @swagger
 * /sigin:
 *  post:
 *   summary: acede a una sesion de usuario.
 *   tags: [Autenticacion]  
 *   requestBody:
 *     required: true
 *     content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'     
 *   responses:
 *     '200':    # status code
 *        description: Usuario creado satisfactoriamente 
 *        content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *     '404':    # status code 
 *        description: error del servidor                           
 */
router.post('/sigin', _authControler.sigIn);
var _default = exports.default = router;