const { mod, div } = require("./helper");
const N = 3;
const BLANKCHAR = 26;

const generateKeyMatrix = (key) => {
  const keyMatrix = [];
  let k = 0;

  for (let i = 0; i < 3; i++) {
    const temp = [];
    for (let j = 0; j < 3; j++) {
      temp.push(mod(key[k], 65));
      k++;
    }
    keyMatrix.push(temp);
  }

  return keyMatrix;
};

const generatePlainTextMatrix = (plaintext) => {
  let matrixPlaintext = [];
  let k = 0;
  for (let i = 0; i < div(plaintext.length, N) + 1; i++) {
    const temp = [];
    for (let j = 0; j < 3; j++) {
      plaintext[k] != null ? temp.push(plaintext) : temp.push(BLANKCHAR);
      k++;
    }
    matrixPlaintext.push(temp);
  }
};

const multiplicationMatrix = (matrixA, matrixB) => {
  return math.multiply(matrixA, matrixB);
};

const matrixToList = (matrix) => {
  let output = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      output.push(matrix[i][j]);
    }
  }

  return output;
};

exports.encryptHill = (plaintext, key) => {
  const matrixPlaintext = generatePlainTextMatrix(plaintext);
  const matrixKey = generateKeyMatrix(key);
  const matrixCipher = multiplicationMatrix(matrixPlaintext, matrixKey);

  return matrixToList(matrixCipher);
};
