import express from 'express';

const app = express();

app.use(express.json());

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

//Middleware de manejo de errores
server.use((error, req, res, next) => {
    console.log(error);

    res.status(error.httpStatus || 500).send({
        status: 'error!!!',
        message: error.message,
    });
});

//implementacion middelwares de control de ruta no encontrada y de errores

//middleware de manejo de errores
app.use((error, req, res, next) => {
    console.log(error);

    res