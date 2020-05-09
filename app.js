"use strict";

// cargar modulos
const express = require("express");
const bodyParser = require("body-parser");
// ejecutar expresss HTMLOutputElementcargar archivos rutas
const app = express();
// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// cors

// prefiijos alas rutas

// ruta mo metodo de prueba para api rest
app.get("/pp", (req, res) => {
  console.log("hola mundo");
  return res.status(200).send({
    curso: "master",
    url: "dsada",
  });
});

// export default app;
module.exports = app;
