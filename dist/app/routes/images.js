"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _acessToken = require("../helpers/acessToken.js");
var _imagenesCotroller = require("../controller/imagenes.cotroller.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Librerias

// se usa para poder ruta a una imagen
// componentes de aplicación
// Inicialitation Rutas
const router = _express.default.Router();

// UTILIZANDO RUTAS Y CONSULTAS
// Consulta todas las imagenes de un usuario
router.get('/verImagesId/:id', _imagenesCotroller.verImagenesId);

// Consulta una imagen
router.get('/verImage/:id', _acessToken.verifyToken, _imagenesCotroller.verImage);

// inserta una imagen 
router.post('/addImage/:id', _acessToken.verifyToken, (0, _expressFileupload.default)({
  useTempFiles: true,
  tempFileDir: './src/uploads'
}), _imagenesCotroller.addImage);

// borrar imagen
router.delete('/deleteImage/:id', _acessToken.verifyToken, _imagenesCotroller.deleteImagen);

// actualiza image
router.put('/updateImage/:id', async (req, res, next) => {
  try {
    const {
      name_img,
      description_img,
      album
    } = req.body;
    console.log(name_img, description_img, album);
  } catch (error) {
    console.log(error);
  }
});
var _default = exports.default = router;