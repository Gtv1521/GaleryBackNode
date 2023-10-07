"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.genereAcessToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// librerias 

// Inicializando estancias 
_dotenv.default.config();

// Crea el access token
const genereAcessToken = user => {
  return _jsonwebtoken.default.sign(user, process.env.SECRET, {
    expiresIn: '6h'
  });
};

// verifica que el token exista y sea activo
exports.genereAcessToken = genereAcessToken;
const verifyToken = (req, res, next) => {
  try {
    const Token = req.headers['authorization'] || req.query.access_token;
    if (!Token) {
      res.send('Access denied');
    } else {
      _jsonwebtoken.default.verify(Token, process.env.SECRET, (err, user) => {
        if (err) {
          res.send('access denied, token expired or incorrect');
        } else {
          next();
        }
      });
    }
  } catch (Error) {
    res.send(Error);
  }
};
exports.verifyToken = verifyToken;