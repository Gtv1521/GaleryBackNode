// librerias 
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

// Inicializando estancias 
dotenv.config();

// Crea el access token
const genereAcessToken = (user) => {
    return jwt.sign(user, process.env.SECRET, { expiresIn: '6h' });
};

// verifica que el token exista y sea activo
const verifyToken = (req, res, next) => {

    try {
        const Token = req.headers['authorization'] || req.query.access_token;
        if (!Token){
            res.send('Access denied');
        }else{
            jwt.verify(Token, process.env.SECRET, (err, user) => {
                if (err) {
                    res.send('access denied, token expired or incorrect');
                } else {
                    next();
                }
            })
        }
    } catch (Error) {
        res.send(Error);
    }
};

export { genereAcessToken, verifyToken }

