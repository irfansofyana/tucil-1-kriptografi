const { encryptVigenere, decryptVigenere } = require("./vigenere");
const { encryptTranspose, decryptTranspose } = require("./transposition");

exports.encryptSuper = (plaintext, key) => {
  const output = encryptVigenere(plaintext, key);
  return encryptTranspose(output);
};

exports.decryptSuper = (cipher, key) => {
  const output = decryptTranspose(cipher);
  return decryptVigenere(output, key);
};
