"use strict";
const validator = require("validator");
const Article = require("../models/articles");
const fs = require("fs");
const path = require("path");

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
      .exec((error, article) => {
        if (error) {
          return res.status(500).send({
            status: "error",
            msg: "error al traer el articulo(s)",
          });
        }
        if (!article) {
          return res.status(404).send({
            status: "error",
            msg: "no se encontor articulo(s) ",
          });
        }
        return res.status(200).send({
          status: "success",
          article,
        });
      });
  },
  getArticle: (req, res) => {
    const articleId = req.params.id;

    if (!articleId || articleId == null) {
      return res.status(404).send({
        status: "error",
        msg: "por favor agregar un id",
      });
    }
    Article.findById(articleId).exec((error, article) => {
      if (error) {
        return res.status(500).send({
          status: "error",
          msg: "error al traer el articulo",
        });
      }
      if (!article) {
        return res.status(404).send({
          status: "error",
          msg: "no se encontor un articulo con ese id",
        });
      }
      return res.status(200).send({
        status: "success",
        article,
      });
    });
  },
  update: (req, res) => {
    const articleId = req.params.id;
    const params = req.body;

    if (!articleId || articleId == null) {
      return res.status(404).send({
        status: "error",
        msg: "por favor agregar un id",
      });
    }
    let validate_title = false;
    let validate_content = false;
    try {
      validate_title = !validator.isEmpty(params.title);
      validate_content = !validator.isEmpty(params.content);
    } catch (err) {
      return res.status(400).send({
        status: "error",
        msg: "faltan datos",
      });
    }

    if (!(validate_title || validate_content)) {
      return res.status(404).send({
        status: "error",
        msg: "alguno de los elemntos esta vacio",
      });
    }
    Article.findOneAndUpdate(
      { _id: articleId },
      params,
      { new: true },
      (err, articleUpdate) => {
        if (err) {
          return res.status(500).send({
            status: "error",
            msg: "error al actualizar",
          });
        }
        if (!articleUpdate) {
          return res.status(404).send({
            status: "error",
            msg: "no existe el articulo",
          });
        }

        return res.status(200).send({
          status: "success",
          msg: articleUpdate,
        });
      }
    );
  },
  delete: (req, res) => {
    const articleId = req.params.id;

    if (!articleId || articleId == null) {
      return res.status(404).send({
        status: "error",
        msg: "por favor agregar un id",
      });
    }
    Article.findOneAndDelete({ _id: articleId }, (err, articleremove) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          msg: "erro al borrar",
        });
      }
      if (!articleremove) {
        return res.status(500).send({
          status: "error",
          msg: "erro al borrar",
        });
      }

      return res.status(200).send({
        status: "success",
        msg: articleremove,
      });
    });
  },
  upload: (req, res) => {
    const articleId = req.params.id;

    if (!articleId || articleId == null) {
      return res.status(404).send({
        status: "error",
        msg: "por favor agregar un id",
      });
    }
    //configurar conect.multiparter

    //recoger fichero

    let fileName = "imagen no subidad";

    if (!req.files) {
      return res.status(500).send({
        status: "error",
        msg: "no hay imagen",
      });
    }
    const filePath = req.files.file0.path;
    const fileSplit = filePath.split("\\")[2];
    console.log(req.files);

    fileName = req.files.file0.name;
    const extension = fileName.split(".")[1];

    if (
      extension == "png" ||
      extension == "jpg" ||
      extension == "jpeg" ||
      extension == "gif"
    ) {
      Article.findOneAndUpdate(
        { _id: articleId },
        { image: fileSplit },
        { new: true },
        (err, articleUpdate) => {
          if (err) {
            return res.status(500).send({
              status: "error",
              msg: "error al actualizar",
            });
          }
          if (!articleUpdate) {
            return res.status(404).send({
              status: "error",
              msg: "no existe el articulo",
            });
          }

          return res.status(200).send({
            status: "success",
            msg1: "archivo guardado correctamente",
            msg: articleUpdate,
            fileName,
            extension,
          });
        }
      );
    } else {
      //consegir nombre y extencion

      fs.unlink(filePath, (err) => {
        return res.status(404).send({
          status: "error",
          msg: "no es un formato valido",
          fileName,
          err,
        });
      });
    }
  },
  getImage: (req, res) => {
    const file = req.params.image;
    if (!file || file == null) {
      return res.status(404).send({
        status: "error",
        msg: "por favor indicar imagen",
      });
    }
    const path_file = `./upload/articles/${file}`;

    fs.exists(path_file, (exists) => {
      if (!exists) {
        return res.status(200).send({
          status: "success",
          msg: "la imagen  no existe",
        });
      }
      return res.status(200).sendFile(path.resolve(path_file));
    });
  },
};

module.exports = controller;
