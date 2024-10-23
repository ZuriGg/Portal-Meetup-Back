import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

//implementacion middelwares de control de ruta no encontrada y de errores

//middleware de manejo de errores
app.use((error, req, res, next) => {
    console.log(error);

    res