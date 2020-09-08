const { matrix, multiply, det, transpose } = require("mathjs");
const { mod, div, inverseMatrix, gcd, modularInverse } = require("../helper");
const N = 3;
const BLANKCHAR = 23;

const generateKeyMatrix = (key) => {
  const keyMatrix = [];
  let k = 0;

  for (let i = 0; i < 3; i++) {
    const temp = [];
    for (let j = 0; j < 3; j++) {
      temp.push(key[k] - 97);
      k++;
    }
    keyMatrix.push(temp);
  }

  return keyMatrix;
};

const generateCipherMatrix = (cipher) => {
  let matrixCipher = [];
  let k = 0;

  for (let i = 0; i < div(cipher.length, N); i++) {
    const temp = [];
    for (let j = 0; j < 3; j++) {
      temp.push(cipher[k] - 65);
      k++;
    }
    matrixCipher.push(temp);
  }
  return matrixCipher;
};

const generatePlaintextMatrix = (plaintext) => {
  let matrixPlaintext = [];
  let k = 0;
  let numRow = div(plaintext.length, N);
  if (mod(plaintext.length, N) != 0) numRow++;

  for (let i = 0; i < numRow; i++) {
    const temp = [];
    for (let j = 0; j < 3; j++) {
      plaintext[k] != null
        ? temp.push(plaintext[k] - 97)
        : temp.push(BLANKCHAR);
      k++;
    }
    matrixPlaintext.push(temp);
  }
  return matrixPlaintext;
};

const multiplicationMatrix = (matrixA, matrixB) => {
  const output = multiply(matrix(matrixA), matrix(matrixB));
  return output["_data"];
};

const matrixToCipherList = (matrix) => {
  let output = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      output.push(mod(matrix[i][j], 26) + 65);
    }
  }

  return output;
};

const matrixToPlaintextList = (matrix, key) => {
  let output = [];
  const modInverseDet = modularInverse(Math.round(det(key)), 26);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      output.push(mod(matrix[i][j] * modInverseDet, 26) + 97);
    }
  }

  return output;
};

exports.checkRelativePrime = (key) => {
  const matrixKey = generateKeyMatrix(key);
  const determinan = Math.round(det(matrixKey));

  if (gcd(mod(determinan, 26), 26) == 1) {
    return true;
  } else {
    return false;
  }
};

exports.encrypt = (plaintext, key) => {
  const matrixPlaintext = transpose(generatePlaintextMatrix(plaintext));
  const matrixKey = generateKeyMatrix(key);
  const matrixCipher = multiplicationMatrix(matrixKey, matrixPlaintext);

  return matrixToCipherList(transpose(matrixCipher));
};

exports.decrypt = (cipher, key) => {
  const matrixCipher = transpose(generateCipherMatrix(cipher));
  const matrixKey = inverseMatrix(generateKeyMatrix(key));
  const matrixPlainText = multiplicationMatrix(matrixKey, matrixCipher);

  return matrixToPlaintextList(
    transpose(matrixPlainText),
    generateKeyMatrix(key)
  );
};
