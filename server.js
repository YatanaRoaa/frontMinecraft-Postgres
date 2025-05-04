const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Sirve archivos estáticos de la carpeta actual
app.use(express.static(path.join(__dirname, '.')));

// Siempre responde index.html para rutas desconocidas (SPA)
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Front server listening on port ${PORT}`);
});
