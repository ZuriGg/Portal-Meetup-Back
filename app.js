import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
