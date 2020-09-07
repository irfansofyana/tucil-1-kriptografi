const express = require("express");
const app = express();
const port = 3000;

const { encryptVigenere, decryptVigenere } = require("./cipher/vigenere");
const { encryptSuper, decryptSuper } = require("./cipher/super");
const { encryptHill, decryptHill } = require("./cipher/hill");
const { textToIntList, intListToText } = require("./cipher/helper");

app.set("view engine", "pug");

app.get("/", function (req, res) {
  res.render("index", { title: "Hey", message: "Hello there!" });
});

const sendData = (res, arrayOfInt) => {
  return res.send({
    data: intListToText(arrayOfInt),
  });
};

app.get("/encrypt/:algoritme/:text/:key", function (req, res) {
  const { algoritme, text, key } = req.params;

  switch (algoritme) {
    case "vigenere":
      sendData(res, encryptVigenere(textToIntList(text), textToIntList(key)));
      break;
    case "super":
      sendData(res, encryptSuper(textToIntList(text), textToIntList(key)));
      break;

    default:
      break;
  }
});

app.get("/decrypt/:algoritme/:text/:key", function (req, res) {
  const { algoritme, text, key } = req.params;

  switch (algoritme) {
    case "vigenere":
      sendData(res, decryptVigenere(textToIntList(text), textToIntList(key)));
      break;
    case "super":
      sendData(res, decryptSuper(textToIntList(text), textToIntList(key)));
      break;

    default:
      break;
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
