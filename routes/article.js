"use strict";

const express = require("express");
const ArticleController = require("../controllers/article.js");

const router = express.Router();

router.get("/test", ArticleController.test);
router.get("/test2", ArticleController.datosCurso);
router.get("/test3", ArticleController.master);

module.exports = router;
