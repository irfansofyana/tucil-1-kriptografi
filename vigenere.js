/*
 * VIGENERE CHIPER
 */

const { mod, intsToCharList } = require("./helper");

/*
 * Returns the result the Vigenère encryption on the given text with the given key.
 */
exports.encryptVigenere = (plaintext, key) => {
  const output = [];
  let j = 0;

  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext.charCodeAt(i);

    if (isLowercase(char)) {
      const p = char - 97;
      const k = key.charCodeAt(j % key.length);

      output.push(mod(p + k, 26) + 65); // Add 65 to make it upper case
      j++;
    }
  }

  return output;
};

exports.decryptVigenere = (cipher, key) => {
  const output = [];
  let j = 0;

  for (let i = 0; i < cipher.length; i++) {
    const char = cipher.charCodeAt(i);

    if (!isUppercase(char)) output.push(char);
    else {
      const c = char - 65;
      const k = key.charCodeAt(j % key.length);

      output.push(mod(c - k, 26) + 97); // Add 97 to make it lower case
      j++;
    }
  }

  return output;
};

// Tests whether the specified character code is an uppercase letter.
const isUppercase = (c) => {
  return 65 <= c && c <= 90; // 65 is character code for 'A'. 90 is 'Z'.
};

// Tests whether the specified character code is a lowercase letter.
const isLowercase = (c) => {
  return 97 <= c && c <= 122; // 97 is character code for 'a'. 122 is 'z'.
};

// const text = intsToCharList(encrypt("indonesia tanah air beta", "mobil"));
// console.log(text.join(""));

// const text2 = intsToCharList(decrypt("NUXPRJZCBXFUUIENYVFXF", "mobil"));
// console.log(text2.join(""));
