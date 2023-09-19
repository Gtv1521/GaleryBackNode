import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

import images from './app/routes/images.js';

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

// Routers
app.use('/api', images);


app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get("port")}`);
});
