// librerias 
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

// Inicializando estancias 
dotenv.config();

// Crea el access token
const genereAcessToken = (user) => {
    return jwt.sign(user, process.env.SECRET, { expiresIn: '6h' });
};

const generePassToken = (user) => {
    return jwt.sign(user, process.env.SECRET, { expiresIn: '10m' });
};

// verifica que el token exista y sea activo
const verifyToken = (req, res, next) => {
    try {
        const Token = req.headers['authorization'] || req.query.access_token;
        if (!Token) {
            res.status(401).json({ error: 'Access denied' });
        } else {
            jwt.verify(Token, process.env.SECRET, (err, user) => {
                if (err) {
                    res.status(405).json({ error: 'Access denied, token expired or incorrect' });
                } else {
                    next();
                }
            })
        }
    } catch (Error) {
        res.status(404).send(Error);
    }
};

export { genereAcessToken, generePassToken, verifyToken }

