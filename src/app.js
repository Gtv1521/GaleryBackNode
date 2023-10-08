// Librerias
import dotenv from 'dotenv'; // muestra las variables globales de la application
import express from 'express';
import morgan from 'morgan'; //muestra las peticiones hechas al servidior y la respuesta de peticion 
import cors from 'cors'; // comunicacion con mas servidores o apliacaciones

// Swagger API
import swaggerUI from 'swagger-ui-express'; //
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from '../swagger.js'

// Initialitation
const app = express();
dotenv.config();

// settings
app.set('port', process.env.PORT || 3000);


// Middlewares
app.use(morgan('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cors());

// configuracion de swaggwer 
const specs = swaggerJSDoc(options);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

// app.use(bodyParser.urlencoded({ extended: false }));


export default app;