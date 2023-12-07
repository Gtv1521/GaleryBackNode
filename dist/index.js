"use strict";

var _app = _interopRequireDefault(require("./app.js"));
var _main = _interopRequireDefault(require("./app/routes/main.js"));
var _images = _interopRequireDefault(require("./app/routes/images.js"));
var _auth = _interopRequireDefault(require("./app/routes/auth.js"));
var _users = _interopRequireDefault(require("./app/routes/users.js"));
var _album = _interopRequireDefault(require("./app/routes/album.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Routers
_app.default.use(_main.default);
_app.default.use(_images.default);
_app.default.use(_auth.default);
_app.default.use(_users.default);
_app.default.use(_album.default);

// Inicializacion de service
_app.default.listen(_app.default.get('port'), e => {
  console.log(`Server listening on ${_app.default.get('port')}`);
});