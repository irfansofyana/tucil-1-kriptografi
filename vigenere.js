/*
 * VIGENERE CHIPER
 */

/*
 * Returns the list of character from given list of integer.
 */
const intsToCharList = (listOfInteger) => {
  const listOfChar = [];

  listOfInteger.forEach((integer) => {
    listOfChar.push(String.fromCharCode(integer));
  });

  return listOfChar;
};

/*
 * Returns the result the Vigenère encryption on the given text with the given key.
 */
const encrypt = (input, key) => {
  const output = [];
  let j = 0;

  for (let i = 0; i < input.length; i++) {
    const charAt_i = input.charCodeAt(i);

    if (!isLetter(charAt_i)) output += input.charAt(i);
    else {
      output.push(((charAt_i - 97 + key.charCodeAt(j % key.length)) % 26) + 97);
      j++;
    }
  }

  return output;
};

// All plaintext are assumed to be lower case
const isLetter = (c) => {
  return 97 <= c && c <= 122; // 97 is character code for 'a'. 122 is 'z'.
};

const text = intsToCharList(encrypt("indonesia", "mobil"));
console.log(text.join(""));
