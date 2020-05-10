"use strict";

const express = require("express");
const ArticleController = require("../controllers/article.js");

const router = express.Router();
const multipart = require("connect-multiparty");
const md_upload = multipart({ uploadDir: "./upload/articles" });

router.get("/test", ArticleController.test);
router.get("/test2", ArticleController.datosCurso);
router.get("/test3", ArticleController.master);
router.post("/save", ArticleController.save);
router.get("/articles/:last?", ArticleController.getArticles);
router.get("/article/:id", ArticleController.getArticle);
router.put("/article/:id", ArticleController.update);
router.delete("/article/:id", ArticleController.delete);
router.post("/upload-image/:id", md_upload, ArticleController.upload);
module.exports = router;
