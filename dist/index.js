"use strict";

var _app = _interopRequireDefault(require("./app.js"));
var _main = _interopRequireDefault(require("./app/routes/main.js"));
var _images = _interopRequireDefault(require("./app/routes/images.js"));
var _auth = _interopRequireDefault(require("./app/routes/auth.js"));
var _users = _interopRequireDefault(require("./app/routes/users.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Routers
_app.default.use(_main.default);
_app.default.use(_images.default);
_app.default.use(_auth.default);
_app.default.use(_users.default);

// Inicializacion de service
_app.default.listen(_app.default.get('port'), e => {
  console.log(`server listening on ${_app.default.get('port')}`);
});