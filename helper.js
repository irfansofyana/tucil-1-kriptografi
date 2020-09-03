exports.mod = (n, m) => {
  return ((n % m) + m) % m;
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
