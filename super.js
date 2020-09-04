const { encryptVigenere, decryptVigenere } = require("./vigenere");
const { div, mod, intsToCharList } = require("./helper");
const K = 4;

const transposeDecrypt = (chiper) => {
  const output = [];
  const matrix = [];
  let index = 0;

  for (let i = 0; i < K; i++) {
    let numRow = div(chiper.length, K);
    if (i < mod(chiper.length, K)) numRow++;

    const temp = [];
    for (let j = 0; j < numRow; j++) {
      temp.push(chiper[index]);
      index++;
    }

    matrix.push(temp);
  }

  index = 0;
  for (let i = 0; i < div(chiper.length, K) + 1; i++) {
    for (let j = 0; j < K; j++) {
      if (matrix[j][i] != null) {
        output[index] = matrix[j][i];
        index++;
      }
    }
  }
  return output;
};

const transposeEncrypt = (plaintext) => {
  const output = [];
  const matrix = [];

  for (let i = 0; i < div(plaintext.length, K) + 1; i++) {
    const temp = [];
    for (let j = 0; j < K; j++) {
      temp.push(plaintext[i * K + j]);
    }
    matrix.push(temp);
  }

  let index = 0;
  for (let i = 0; i < K; i++) {
    for (let j = 0; j < div(plaintext.length, K) + 1; j++) {
      if (matrix[j][i] != null) {
        output[index] = matrix[j][i];
        index++;
      }
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
