"use strict";
const validator = require("validator");
const Article = require("../models/articles");

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
  save: (req, res) => {
    //recoger pamarametrso por post
    let params = req.body;
    let validate_title = false;
    let validate_content = false;

    // Validar datos
    try {
      validate_title = !validator.isEmpty(params.title);
      validate_content = !validator.isEmpty(params.content);
    } catch (error) {
      return res.status(300).send({
        msg: "Faltan datos por enviar",
      });
    }
    //si alguno dato esta vacio
    if (!(validate_content && validate_title)) {
      return res.status(300).send({
        msg: "alguno de los datos esta vacio",
      });
    }
    const article = new Article();
    // asignar valores
    article.title = params.title;
    article.content = params.content;
    article.image = null;
    // guardar artiulo
    article.save((err, articleStored) => {
      if (err || !articleStored) {
        return res.status(404).send({
          msg: "datos no son validos",
        });
      }
    });
    // devolver respuesta
    return res.status(200).send({
      article: article,
    });
  },
  getArticles: (req, res) => {
    //find
    const last = req.params.last;
    let query = Article.find({});
    if (last || last != undefined) {
      query.limit(5);
    }

    query
      .find(query)
      .sort("-_id")
      .exec()
      .then((articles) => {
        if (!articles) {
          return res.status(404).send({
            status: "error",
            msg: "articulos vacios",
          });
        }
        return res.status(500).send({
          status: "sucess",
          articles,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          status: "error",
          err,
        });
      });
  },
};

module.exports = controller;
