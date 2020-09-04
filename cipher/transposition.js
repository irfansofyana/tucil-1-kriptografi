const { div, mod } = require("./helper");
const K = 4;

exports.encryptTranspose = (plaintext) => {
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

exports.decryptTranspose = (chiper) => {
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
