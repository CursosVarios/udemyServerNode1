"use strict";

// cargar modulos
const express = require("express");
const bodyParser = require("body-parser");
// ejecutar expresss HTMLOutputElementcargar archivos rutas
const app = express();

//cargar ficehros de rutas
const routeArticles = require("./routes/article");

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// cors

// prefiijos alas rutas

//añadir prefijo de rutas
app.use("/api/", routeArticles);
// ruta mo metodo de prueba para api rest

// export default app;
module.exports = app;
