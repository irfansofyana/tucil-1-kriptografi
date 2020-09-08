const express = require("express");
const multer = require("multer");
const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage }).single("file");

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

const matrixFullVigenere = require("./cipher/varian_vigenere/helper").generateMatrix();
const rotorsConfig = require("./cipher/enigma/helper").randomConfig();

app.set("view engine", "pug");

app.post("/upload/file", function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});

app.get("/", function (req, res) {
  res.render("raw", { title: "Hey" });
});

app.get("/file", function (req, res) {
  res.render("file", { title: "Hey" });
});

const sendData = (res, data, needCasting) => {
  return res.send({
    data: needCasting ? intListToText(data) : data,
  });
};

app.get("/check/hill/:key", function (req, res) {
  res.send({
    data: hill.checkRelativePrime(textToIntList(req.params.key)),
  });
});

app.get("/encrypt/:algoritme/:text/:key", function (req, res) {
  const { algoritme } = req.params;

  const text = ["vigenere", "super", "hill", "playfair"].includes(algoritme)
    ? textToIntList(req.params.text)
    : req.params.text;
  const key = ["vigenere", "super", "hill", "playfair"].includes(algoritme)
    ? textToIntList(req.params.key)
    : req.params.key;

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
      sendData(res, enigma.encrypt(text, key, rotorsConfig), false);
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

  const text = ["vigenere", "super", "hill", "playfair"].includes(algoritme)
    ? textToIntList(req.params.text)
    : req.params.text;
  const key = ["vigenere", "super", "hill", "playfair"].includes(algoritme)
    ? textToIntList(req.params.key)
    : req.params.key;

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
      sendData(res, enigma.decrypt(text, key, rotorsConfig), false);
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
