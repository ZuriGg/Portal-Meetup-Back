import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

//implementacion middelwares de control de ruta no encontrada y de errores

//middleware de manejo de errores
app.use((error, req, res, next) => {
    console.log(error);

    res.status(error.httpStatus || 500).send({
        status: 'error!!!',
        message: error.message
    });
});

//middelware de ruta no encontrada
app.use((req,res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not Found'
    });
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
