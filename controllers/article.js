"use strict";

const mongoose = require("mongoose");

const controller = {
  datosCurso: (req, res) => {
    const hola = req.body.hola;
    return res.status(200).send({
      curso: "curso 1",
      autor: "mario",
    });
  },
  test: (req, res) => {
    return res.status(200).send({
      curso: "test",
    });
  },
  master: (req, res) => {
    console.log("hola mundo");
    return res.status(200).send({
      curso: "master",
      url: "dsada",
    });
  },
};

module.exports = controller;
