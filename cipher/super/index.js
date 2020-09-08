const vigenere = require("../vigenere");
const transpose = require("../transposition");

exports.encrypt = (plaintext, key) => {
  const output = vigenere.encrypt(plaintext, key);
  return transpose.encrypt(output);
};

exports.decrypt = (cipher, key) => {
  const output = transpose.decrypt(cipher);
  return vigenere.decrypt(output, key);
};
