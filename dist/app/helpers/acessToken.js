"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.generePassToken = exports.genereAcessToken = void 0;
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
exports.genereAcessToken = genereAcessToken;
const generePassToken = user => {
  return _jsonwebtoken.default.sign(user, process.env.SECRET, {
    expiresIn: '1h'
  });
};

// verifica que el token exista y sea activo
exports.generePassToken = generePassToken;
const verifyToken = (req, res, next) => {
  try {
    const Token = req.headers['authorization'] || req.query.access_token;
    if (!Token) {
      res.status(401).json({
        message: 'Access denied'
      });
    } else {
      _jsonwebtoken.default.verify(Token, process.env.SECRET, (err, user) => {
        if (err) {
          res.status(404).json({
            message: 'Access denied, token expired or incorrect'
          });
        } else {
          next();
        }
      });
    }
  } catch (Error) {
    res.status(404).send(Error);
  }
};
exports.verifyToken = verifyToken;