import app from './app.js';
import main from './app/routes/main.js'
import images from './app/routes/images.js'
import auth from './app/routes/auth.js'
import users from './app/routes/users.js'


// Routers
app.use(main);
app.use(images);
app.use(auth);
app.use(users);


// Inicializacion de service
app.listen(app.get('port'), (e) => {
    console.log(`server listening on ${app.get('port')}`);
});

