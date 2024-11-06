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

app.use(express.json());

//middleware MORGAN: muestra en consola info de la petición.
app.use(morgan('dev'));

//middleware CORS: evita que interfieran cuando conectemos front con back
app.use(cors());

//middleware que "desencripta" un body "form-data", creando las propiedades "body" y "files" en el objeto "request"
app.use(fileUpload());

//ruta estática para ser usada desde el front para pedir el envio de una imagen o cualquier archivo estatico
const staticDir = path.join(process.cwd(), './src/uploads');
app.use('/uploads', express.static(staticDir)); //uploads es un directorio estático/endpoint para pedir una imagen

// Middleware que indica a express dónde están las rutas.
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
