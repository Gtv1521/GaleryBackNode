"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
console.log(process.env.HOST, process.env.USER1, process.env.PORTDB, process.env.PASS, process.env.DATABASE);
const database = {
  host: process.env.HOST || 'localhost',
  user: process.env.USER1 || 'gustavo',
  //    port: process.env.PORTDB || 3306,
  password: process.env.PASS || '1234',
  database: process.env.DATABASE || 'dataImagenes'
};
var _default = exports.default = database;