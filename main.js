const bodyParser = require("body-parser");
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

const matrixFullVigenere = require("./cipher/varian_vigenere/helper").generateMatrix();
const rotorsConfig = require("./cipher/enigma/helper").randomConfig();
const affineHelper = require("./cipher/affine/helper");

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

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

app.get("/check/affine/:key1", function (req, res) {
  res.send({
    data: affineHelper.gcd(parseInt(req.params.key1), 26) === 1,
  });
});

app.post("/encrypt/:algoritme", function (req, res) {
  const { algoritme } = req.params;

  const text = ["vigenere", "super", "hill", "playfair"].includes(algoritme)
    ? textToIntList(req.body.text)
    : req.body.text;

  if (algoritme === "affine") {
    var key1 = req.body.key1;
    var key2 = req.body.key2;
  } else {
    var key = ["vigenere", "super", "hill", "playfair"].includes(algoritme)
      ? textToIntList(req.body.key)
      : req.body.key;
  }

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
    case "enigma":
      sendData(res, enigma.encrypt(text, key, rotorsConfig), false);
      break;
    case "full":
      sendData(res, fullVigenere.encrypt(text, key, matrixFullVigenere), false);
      break;
    case "autokey":
      sendData(res, autoKey.encrypt(text, key), false);
      break;
    case "affine":
      sendData(res, affine.encrypt(text, key1, key2), false);
    default:
      break;
  }
});

app.post("/decrypt/:algoritme", function (req, res) {
  const { algoritme } = req.params;

  const text = ["vigenere", "super", "hill", "playfair"].includes(algoritme)
    ? textToIntList(req.body.text)
    : req.body.text;

  if (algoritme === "affine") {
    var key1 = req.body.key1;
    var key2 = req.body.key2;
  } else {
    var key = ["vigenere", "super", "hill", "playfair"].includes(algoritme)
      ? textToIntList(req.body.key)
      : req.body.key;
  }

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
    case "affine":
      sendData(res, affine.decrypt(text, key1, key2), false);
      break;
    default:
      break;
  }
});

app.listen(port, () => {
  console.log(`Program sudah berjalan. Silakan buka di http://localhost:${port}`);
});
