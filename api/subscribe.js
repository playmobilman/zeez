const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ message: 'Correo inválido' });
    }

    const filePath = path.join(process.cwd(), 'emails.txt');
    const entry = `${new Date().toISOString()} - ${email}\n`;

    fs.appendFile(filePath, entry, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al guardar el correo' });
        }
        res.json({ message: 'Correo registrado con éxito' });
    });
}
