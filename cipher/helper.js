const { det } = require("mathjs");

exports.mod = (n, m) => {
  return ((n % m) + m) % m;
};

exports.div = (n, m) => {
  return Math.floor(n / m);
};

// Tests whether the specified character code is an uppercase letter.
exports.isUppercase = (c) => {
  return 65 <= c && c <= 90; // 65 is character code for 'A'. 90 is 'Z'.
};

// Tests whether the specified character code is a lowercase letter.
exports.isLowercase = (c) => {
  return 97 <= c && c <= 122; // 97 is character code for 'a'. 122 is 'z'.
};

exports.toLowerCase = (arrayInt) => {
  const output = [];
  arrayInt.forEach((n) => {
    output.push(n + 32);
  });

  return output;
};

exports.textToIntList = (text) => {
  const intList = [];

  for (let i = 0; i < text.length; i++) {
    intList.push(text.charCodeAt(i));
  }

  return intList;
};

/*
 * Returns the list of character from given list of integer.
 */
const intListToCharList = (intList) => {
  const charList = [];

  intList.forEach((integer) => {
    charList.push(String.fromCharCode(integer));
  });

  return charList;
};

exports.intListToText = (intList) => {
  return intListToCharList(intList).join("");
};

exports.gcd = (a, b) => {
  if (!b) {
    return a;
  }
  return this.gcd(b, a % b);
};

exports.modularInverse = (m, n) => {
  m = this.mod(m, n);
  for (let x = 1; x < n; x++) if ((m * x) % n == 1) return x;
};

exports.inverseMatrix = (matrix) => {
  let minorMatrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      minorMatrix[i][j] =
        matrix[(i + 1) % 3][(j + 1) % 3] * matrix[(i + 2) % 3][(j + 2) % 3] -
        matrix[(i + 1) % 3][(j + 2) % 3] * matrix[(i + 2) % 3][(j + 1) % 3];
    }
  }

  let adjointMatrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  for (let i = 0; i < minorMatrix.length; i++) {
    for (let j = 0; j < minorMatrix[i].length; j++) {
      adjointMatrix[j][i] = minorMatrix[i][j];
    }
  }
  return adjointMatrix;
};
