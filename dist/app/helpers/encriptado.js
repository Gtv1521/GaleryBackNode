"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encrypt = exports.comparar = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const encrypt = async textPlain => {
  const hast = await _bcryptjs.default.hash(textPlain, 10);
  return hast;
};
exports.encrypt = encrypt;
const comparar = async (passPlain, passEncript) => {
  return await _bcryptjs.default.compare(passPlain, passEncript);
};
exports.comparar = comparar;