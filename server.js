const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const puerto = 3000;

// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Servir archivos estáticos
app.use(express.static('public'));

// Ruta para subir archivos
app.post('/subir', upload.array('archivos'), (req, res) => {
    res.redirect('/');
});

// Ruta para obtener la lista de archivos
app.get('/archivos', (req, res) => {
    const rutaDirectorio = path.join(__dirname, 'uploads');
    
    fs.readdir(rutaDirectorio, (err, archivos) => {
        if (err) {
            return res.status(500).send(err);
        }
        
        res.json({ archivos });
    });
});

// Ruta para descargar archivos
app.get('/descargar', (req, res) => {
    const archivosDescargar = JSON.parse(req.query.archivos);

    archivosDescargar.forEach(archivo => {
        const rutaArchivo = path.join(__dirname, 'uploads', archivo);
        res.download(rutaArchivo);
    });
});

app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
