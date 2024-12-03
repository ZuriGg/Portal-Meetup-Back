import express from 'express';
import fileUpload from 'express-fileupload'; /* librería para subir imágenes */
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

// Importamos las rutas.
import routes from './src/routes/index.js';

import {
    errorController,
    notFoundController,
} from './src/controllers/errors/index.js';

//creación del servidor
const app = express();

// Establecemos la carpeta /Uploads como pública accesible desde el enlace "http://localhost:3000/uploads/"
app.use('/uploads', express.static(path.join(process.cwd(), 'src', 'uploads')));

app.use(express.json());

//middleware MORGAN: muestra en consola info de la petición.
app.use(morgan('dev'));

//middleware CORS: evita que interfieran cuando conectemos front con back
app.use(
    cors({
        origin: ['http://localhost:5173', 'portal-meetup-front.vercel.app'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'user', 'date'],
    })
);

//middleware que "desencripta" un body "form-data", creando las propiedades "body" y "files" en el objeto "request"
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

// Middleware que indica a express dónde están las rutas.
app.use(routes);

//middelware de ruta no encontrada
app.use(notFoundController);

//middleware de manejo de errores
app.use(errorController);

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
