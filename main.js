const express = require("express");
const app = express();
const port = 3000;

const vigenere = require("./cipher/vigenere");
const superCipher = require("./cipher/super");
const hill = require("./cipher/hill");
const playfair = require("./cipher/playfair");

const { intListToText, textToIntList } = require("./cipher/helper");

app.set("view engine", "pug");

app.get("/", function (req, res) {
  res.render("index", { title: "Hey", message: "Hello there!" });
});

const sendData = (res, arrayOfInt) => {
  return res.send({
    data: intListToText(arrayOfInt),
  });
};

app.get("/check/hill/:key", function (req, res) {
  res.send({
    data: hill.checkRelativePrime(textToIntList(req.params.key)),
  });
});

app.get("/encrypt/:algoritme/:text/:key", function (req, res) {
  const { algoritme } = req.params;
  const text = textToIntList(req.params.text);
  const key = textToIntList(req.params.key);

  switch (algoritme) {
    case "vigenere":
      sendData(res, vigenere.encrypt(text, key));
      break;
    case "super":
      sendData(res, superCipher.encrypt(text, key));
      break;
    case "hill":
      sendData(res, hill.encrypt(text, key));
      break;
    case "playfair":
      sendData(res, playfair.encrypt(text, key));
      break;

    default:
      break;
  }
});

app.get("/decrypt/:algoritme/:text/:key", function (req, res) {
  const { algoritme } = req.params;
  const text = textToIntList(req.params.text);
  const key = textToIntList(req.params.key);

  switch (algoritme) {
    case "vigenere":
      sendData(res, vigenere.decrypt(text, key));
      break;
    case "super":
      sendData(res, superCipher.decrypt(text, key));
      break;
    case "hill":
      sendData(res, hill.decrypt(text, key));
      break;
    case "playfair":
      sendData(res, playfair.decrypt(text, key));
      break;

    default:
      break;
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
