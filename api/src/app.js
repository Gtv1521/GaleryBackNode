import dotenv from 'dotenv'; // muestra las variables globales de la application
import express from 'express';
import morgan from 'morgan'; //muestra las peticiones hechas al servidior y la respuesta de peticion 
import bodyParser from 'body-parser'; // lee peticiones http  
import cors from 'cors'; //


// Initialitation
const app = express(); dotenv.config();

// settings
app.set('port', process.env.PORT || 3000);


// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));


export default app;