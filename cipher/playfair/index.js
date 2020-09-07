const { textToIntList, toLowerCase } = require("../helper");

const CODE_I = 105;
const CODE_J = 106;
const CODE_X = 120;

const arrayToMatrix = (array) => {
  const matrix = [];
  let k = 0;

  for (let i = 0; i < 5; i++) {
    const temp = [];
    for (let j = 0; j < 5; j++) {
      temp.push(array[k]);
      k++;
    }
    matrix.push(temp);
  }

  return matrix;
};

const generateKeyMatrix = (key) => {
  const keyArray = [];

  for (let i = 0; i < key.length; i++) {
    if (!keyArray.includes(key[i]) && key[i] != CODE_J) keyArray.push(key[i]);
  }

  const alphabet = textToIntList("abcdefghiklmnopqrstuvwxyz");
  for (let i = 0; i < alphabet.length; i++) {
    if (!keyArray.includes(alphabet[i])) keyArray.push(alphabet[i]);
  }

  return arrayToMatrix(keyArray);
};

const generateBigram = (text) => {
  for (let i = 0; i < text.length; i++) {
    if (text[i] == CODE_J) text[i] = CODE_I;
  }

  const bigramArray = [];

  let i = 0;
  while (i < text.length) {
    if (text[i] != text[i + 1]) {
      if (text[i + 1] != null) bigramArray.push([text[i], text[i + 1]]);
      else bigramArray.push([text[i], CODE_X]);

      i += 2;
    } else {
      bigramArray.push([text[i], CODE_X]);
      i++;
    }
  }

  return bigramArray;
};

const findElementOnMatrix = (element, matrix) => {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (matrix[i][j] == element) return [i, j];
    }
  }
};

const processEncryptPlayfair = (matrix, bigram) => {
  const locationA = findElementOnMatrix(bigram[0], matrix);
  const locationB = findElementOnMatrix(bigram[1], matrix);

  if (locationA[0] == locationB[0]) {
    return [
      matrix[locationA[0]][(locationA[1] + 1) % 5],
      matrix[locationA[0]][(locationB[1] + 1) % 5],
    ];
  } else if (locationA[1] == locationB[1]) {
    return [
      matrix[(locationA[0] + 1) % 5][locationA[1]],
      matrix[(locationB[0] + 1) % 5][locationA[1]],
    ];
  } else {
    return [
      matrix[locationA[0]][locationB[1]],
      matrix[locationB[0]][locationA[1]],
    ];
  }
};

const processDecryptPlayfair = (matrix, bigram) => {
  const locationA = findElementOnMatrix(bigram[0], matrix);
  const locationB = findElementOnMatrix(bigram[1], matrix);

  if (locationA[0] == locationB[0]) {
    return [
      matrix[locationA[0]][(locationA[1] + 4) % 5],
      matrix[locationA[0]][(locationB[1] + 4) % 5],
    ];
  } else if (locationA[1] == locationB[1]) {
    return [
      matrix[(locationA[0] + 4) % 5][locationA[1]],
      matrix[(locationB[0] + 4) % 5][locationA[1]],
    ];
  } else {
    return [
      matrix[locationA[0]][locationB[1]],
      matrix[locationB[0]][locationA[1]],
    ];
  }
};

exports.encrypt = (plaintext, key) => {
  const bigramArray = generateBigram(plaintext);
  const keyMatrix = generateKeyMatrix(key);
  const output = [];

  for (let i = 0; i < bigramArray.length; i++) {
    const bigram = processEncryptPlayfair(keyMatrix, bigramArray[i]);
    output.push(bigram[0] - 32);
    output.push(bigram[1] - 32);
  }

  return output;
};

exports.decrypt = (cipher, key) => {
  const bigramArray = generateBigram(toLowerCase(cipher));
  const keyMatrix = generateKeyMatrix(key);
  const output = [];

  for (let i = 0; i < bigramArray.length; i++) {
    const bigram = processDecryptPlayfair(keyMatrix, bigramArray[i]);

    output.push(bigram[0]);
    output.push(bigram[1]);
  }

  return output;
};
