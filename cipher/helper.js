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

const gcd = (a, b) => {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
};

const modularInverse = (m, n) => {
  m = m % n;

  let x = m;
  let y = n;

  let divs = [];
  let adds = [];

  let result;

  if (y > x) {
    let i = 1;
    while (x != 0) {
      divs[i] = Math.floor(y / x);
      let temp = x;
      x = y % x;
      y = temp;
      i++;
    }

    let len = divs.length;
    adds[len - 1] = 0;
    adds[len - 2] = 1;
    for (let index = len - 2; index > 0; index--) {
      adds[index - 1] = divs[index] * adds[index] + adds[index + 1];
    }

    if (adds[0] * m > adds[1] * n) {
      result = adds[0];
    } else {
      result = n - adds[0];
    }
  }

  return result;
};

exports.inverseMatrix = (matrix) => {
  const modularInverseDet = modularInverse(Math.round(det(matrix)), 26);

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
      adjointMatrix[j][i] = this.mod(modularInverseDet * minorMatrix[i][j], 26);
    }
  }
  return adjointMatrix;
};
