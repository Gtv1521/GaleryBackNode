"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAlbum = exports.deleteAlbum = exports.albumsIdUser = exports.albumNew = exports.albumId = void 0;
var _cloudinary = require("../../config/cloudinary");
var _dataBaseConect = _interopRequireDefault(require("../../config/dataBaseConect"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// componentes de aplicación

const buscaNombre = async (nombre, id) => {
  return await _dataBaseConect.default.query('SELECT * FROM albums WHERE nombre_album = ? and user_id = ?', [nombre, id]);
};
const enlaceImg = async album_id => {
  return await _dataBaseConect.default.query('SELECT id_url FROM imagenes WHERE album_id = ?', [album_id]);
};

// muestra todos los albunes de cada usuario
const albumsIdUser = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    if (!id) {
      res.status(404).json({
        error: 'Send a user'
      });
    } else {
      const result = await _dataBaseConect.default.query('SELECT * FROM albums WHERE user_id = ?', [id]);
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(200).json({
          message: 'No albums created'
        });
      }
    }
  } catch (error) {
    res.json({
      error: 'Something went wrong'
    });
  }
};

// muestra un album con el id
exports.albumsIdUser = albumsIdUser;
const albumId = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    if (!id) {
      res.status(404).json({
        error: 'Send id of album'
      });
    } else {
      const result = await _dataBaseConect.default.query('SELECT * FROM albums WHERE id_album = ?', [id]);
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(200).json({
          message: 'The album does not exist'
        });
      }
    }
  } catch (error) {
    res.json({
      error: 'Something went wrong'
    });
  }
};

// crea un nuevo album
exports.albumId = albumId;
const albumNew = async (req, res) => {
  try {
    const {
      id
    } = req.params; //id de usuario
    const {
      nombre
    } = req.body;
    if (!id || !nombre) {
      res.status(301).json({
        error: 'Send all data'
      });
    } else {
      const check = await buscaNombre(nombre, id);
      if (check.length > 0) {
        res.json({
          error: 'The album exists to this user'
        }).status(304);
      } else {
        const result = await _dataBaseConect.default.query(`INSERT INTO albums 
                (nombre_album, user_id) VALUES (?,?)`, [nombre, id]);
        if (result.serverStatus === 2) {
          res.status(200).json({
            nombre_album: nombre,
            id_user: id,
            message: 'Album added successfully'
          });
        }
      }
    }
  } catch (error) {
    res.json({
      error: 'Something went wrong'
    });
  }
};

// muestra un album con el id
exports.albumNew = albumNew;
const updateAlbum = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      nombre
    } = req.body;
    if (!id || !nombre) {
      res.status(404).json({
        error: 'Send all data'
      });
    } else {
      const check = await buscaNombre(nombre, id); // verifica que no exista ese album
      console.log(check);
      if (check.length === 0) {
        const result = await _dataBaseConect.default.query('UPDATE albums SET nombre_album = ? WHERE id_album = ?', [nombre, id]);
        if (result.serverStatus === 2 && result.changedRows === 1) {
          res.status(200).json({
            status: 200,
            message: 'Album update successfully'
          });
        } else {
          res.status(200).json({
            message: 'The album have this name'
          });
        }
      } else {
        res.status(404).json({
          message: 'The album does not exists'
        });
      }
    }
  } catch (error) {
    res.json({
      error: 'Something went wrong'
    });
  }
};

// elimina un album con las imagenes
exports.updateAlbum = updateAlbum;
const deleteAlbum = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    if (!id) {
      res.status(404).json({
        error: 'id Not Found'
      });
    } else {
      const url_id = await enlaceImg(id);
      for (let i = 0; url_id.length > i; i++) {
        (0, _cloudinary.fotoDelete)(url_id[i].id_url);
        const delet = await _dataBaseConect.default.query(`DELETE FROM imagenes WHERE album_id = ? and id_url = ?`, [id, url_id[i].id_url]);
      }
      const result = await _dataBaseConect.default.query(`DELETE FROM albums WHERE id_album = ?`, [id]);
      if (result.serverStatus === 2) {
        res.status(200).json({
          message: 'Album delete'
        });
      }
    }
  } catch (error) {
    res.json(error);
  }
};
exports.deleteAlbum = deleteAlbum;