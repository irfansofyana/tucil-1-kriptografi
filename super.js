const { encryptVigenere, decryptVigenere } = require("./vigenere");
const { mod, intsToCharList } = require("./helper");
const K = 4;

const transposeEncrypt = (cipher) => {
  const output = [];
  let j = 0;

  for (let i = 0; i < cipher.length; i++) {
    output[i] = cipher[j];
    j += K;

    if (j >= cipher.length) {
      j++;
      j = mod(j, K);
    }
  }

  return output;
};

const encryptSuper = (plaintext, key) => {
  const output = encryptVigenere(plaintext, key);
  return transposeEncrypt(output);
};

const decryptSuper = (cipher, key) => {
  const listOfInteger = [];

  for (let i = 0; i < cipher.length; i++) {
    listOfInteger.push(cipher.charCodeAt(i));
  }

  const output = transposeDecrypt(listOfInteger);
  return decryptVigenere(intsToCharList(output).join(""), key);
};

const text = intsToCharList(encryptSuper("indonesia", "mobil"));
console.log(text.join(""));

const text2 = intsToCharList(decryptSuper("NRBUJXZPC", "mobil"));
console.log(text2.join(""));
