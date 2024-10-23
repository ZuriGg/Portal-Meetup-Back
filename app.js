import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(express.json());

// Middleware MORGAN: muestra por consola información sobre la petición entrante.
app.use(morgan('dev'));

// Middleware CORS: evita que interfieran cuando conectemos front con back
app.use(cors());

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

//Middleware de manejo de errores
server.use((error, req, res, next) => {
    console.log(error);

    res.status(error.httpStatus || 500).send({
        status: 'error!!!',
        message: error.message,
    });
});

//middelware de ruta no encontrada
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
