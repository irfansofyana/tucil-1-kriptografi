exports.mod = (n, m) => {
  return ((n % m) + m) % m;
};

exports.div = (n, m) => {
  return Math.floor(n / m);
};

/*
 * Returns the list of character from given list of integer.
 */
exports.intsToCharList = (listOfInteger) => {
  const listOfChar = [];

  listOfInteger.forEach((integer) => {
    listOfChar.push(String.fromCharCode(integer));
  });

  return listOfChar;
};
