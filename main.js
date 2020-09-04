const { encryptVigenere, decryptVigenere } = require("./cipher/vigenere");
const { encryptSuper, decryptSuper } = require("./cipher/super");
const { textToIntList, intListToText } = require("./cipher/helper");

const plaintext = "indonesia adalah negara maritim";
const key = "mobil";

const cipherVigenere = encryptVigenere(
  textToIntList(plaintext),
  textToIntList(key)
);
const plaintextVigenere = decryptVigenere(cipherVigenere, textToIntList(key));

console.log(intListToText(cipherVigenere));
console.log(intListToText(plaintextVigenere));

const cipherSuper = encryptSuper(textToIntList(plaintext), textToIntList(key));
const plaintextSuper = decryptSuper(cipherSuper, textToIntList(key));

console.log(intListToText(cipherSuper));
console.log(intListToText(plaintextSuper));
