"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fotoUpload = exports.fotoDelete = void 0;
var _cloudinary = require("cloudinary");
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// librerias 

// iniciando estancias 
_dotenv.default.config();
_cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
});
const fotoUpload = async filePath => {
  return await _cloudinary.v2.uploader.upload(filePath, {
    folder: 'aplicacionFotos'
  });
};
exports.fotoUpload = fotoUpload;
const fotoDelete = async publicId => {
  return await _cloudinary.v2.uploader.destroy(publicId);
};
exports.fotoDelete = fotoDelete;