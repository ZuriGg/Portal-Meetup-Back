import express from 'express';
import fileUpload from 'express-fileupload'; /* librería para subir imágenes */
import cors from 'cors';
import morgan from 'morgan';

import {
    errorController,
    notFoundController,
} from './src/controllers/errors/index.js';

const app = express();

app.use(express.json());

// Middleware MORGAN: muestra por consola información sobre la petición entrante.
app.use(morgan('dev'));

// Middleware CORS: evita que interfieran cuando conectemos front con back
app.use(cors());

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

//middleware de manejo de errores --> sustituir por errorController()
app.use((error, req, res, next) => {
    console.log(error);

    res.status(error.httpStatus || 500).send({
        status: 'error!!!',
        message: error.message,
    });
});

//middelware de ruta no encontrada --> sustituir por notFoundController()
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not Found',
    });
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
