import express from 'express';
import fileUpload from 'express-fileupload'; /* librería para subir imágenes */
import cors from 'cors';
import morgan from 'morgan';

import {
    errorController,
    notFoundController,
} from './src/controllers/errors/index.js';

//creación del servidor
const app = express();

app.use(express.json());

//middleware MORGAN: muestra en consola info de la petición.
app.use(morgan('dev'));

//middleware CORS: evita que interfieran cuando conectemos front con back
app.use(cors());

//middleware de rutas.
app.use(routes);

//middleware de manejo de errores
app.use(errorController);

//middelware de ruta no encontrada
app.use(notFoundController);

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

/* FALTAN 
- middleware del form Data
- middleware de directorios estáticos */
