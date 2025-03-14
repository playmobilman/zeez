const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Ruta para registrar correos electrónicos
app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ message: 'Correo inválido' });
    }

    const filePath = path.join(__dirname, 'emails.txt');
    const entry = `${new Date().toISOString()} - ${email}\n`;

    fs.appendFile(filePath, entry, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al guardar el correo' });
        }
        res.json({ message: 'Correo registrado con éxito' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
