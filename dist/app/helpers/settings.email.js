"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transporter = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// librerias

// iniciando estancias
_dotenv.default.config();
const transporter = exports.transporter = _nodemailer.default.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.USERMAIL || 'gustavober98@gmail.com',
    pass: process.env.PASSMAIL || '1234'
  }
});
transporter.verify().then(console.log('Ready for send emails'));