const express = require("express");
const app = express();
const port = 3000;

const vigenere = require("./cipher/vigenere");
const superCipher = require("./cipher/super");
const hill = require("./cipher/hill");
const playfair = require("./cipher/playfair");
const enigma = require("./cipher/enigma");
const affine = require("./cipher/affine");
const extended = require("./cipher/extended_vigenere");
const autoKey = require("./cipher/varian_vigenere/auto_key_vigenere");
const fullVigenere = require("./cipher/varian_vigenere/full_vigenere");

const { intListToText, textToIntList } = require("./cipher/helper");
const { matrix } = require("mathjs");

const matrixFullVigenere = require("./cipher/varian_vigenere/helper").generateMatrix();

app.set("view engine", "pug");

app.get("/", function (req, res) {
  res.render("index", { title: "Hey", message: "Hello there!" });
});

const sendData = (res, data, needCasting) => {
  return res.send({
    data: (needCasting ? intListToText(data) : data)
  });
};

app.get("/encrypt/:algoritme/:text/:key", function (req, res) {
  const { algoritme } = req.params;

  const text = (
    ["vigenere", "super", "hill", "playfair"].includes(algoritme) ? 
    textToIntList(req.params.text) :
    req.params.text
  );
  const key = (
    ["vigenere", "super", "hill", "playfair"].includes(algoritme) ? 
    textToIntList(req.params.key) :
    req.params.key
  );

  switch (algoritme) {
    case "vigenere":
      sendData(res, vigenere.encrypt(text, key), true);
      break;
    case "super":
      sendData(res, superCipher.encrypt(text, key), true);
      break;
    case "hill":
      sendData(res, hill.encrypt(text, key), true);
      break;
    case "playfair":
      sendData(res, playfair.encrypt(text, key), true);
      break;
    case "extended":
      sendData(res, extended.encrypt(text, key), false);
      break;
    case "affine":
      // TO DO
      break;
    case "enigma":
      // TO DO
      break;
    case "full":
      sendData(res, fullVigenere.encrypt(text, key, matrixFullVigenere), false);
      break;
    case "autokey":
      sendData(res, autoKey.encrypt(text, key), false);
      break;
    default:
      break;
  }
});

app.get("/decrypt/:algoritme/:text/:key", function (req, res) {
  const { algoritme } = req.params;

  const text = (
    ["vigenere", "super", "hill", "playfair"].includes(algoritme) ? 
    textToIntList(req.params.text) :
    req.params.text
  );
  const key = (
    ["vigenere", "super", "hill", "playfair"].includes(algoritme) ? 
    textToIntList(req.params.key) :
    req.params.key
  );

  switch (algoritme) {
    case "vigenere":
      sendData(res, vigenere.decrypt(text, key), true);
      break;
    case "super":
      sendData(res, superCipher.decrypt(text, key), true);
      break;
    case "hill":
      sendData(res, hill.decrypt(text, key), true);
      break;
    case "playfair":
      sendData(res, playfair.decrypt(text, key), true);
      break;
    case "extended":
      sendData(res, extended.decrypt(text, key), false);
    case "affine":
      break;
    case "enigma":
      break;
    case "full":
      sendData(res, fullVigenere.decrypt(text, key, matrixFullVigenere), false);
      break;
    case "autokey":
      sendData(res, autoKey.decrypt(text, key), false);
      break;
    default:
      break;
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
