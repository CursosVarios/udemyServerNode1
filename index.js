"use strict";
const mogoose = require("mongoose");
const app = require("./app");
const port = 3900;

const urlDB = "mongodb://localhost:27017/curso_api_rest_blog";
const optionDB = {
  useNewUrlParser: true,
};
mogoose.set("useFindAndModify", false);
mogoose.Promise = global.Promise;
mogoose.connect(urlDB, optionDB).then(() => {
  console.log("---   Conectandose con  la base de datos  ---");
  app.listen(port, () => {
    console.log("servidor corriendo en el http://localhost:" + port);
  });
});
