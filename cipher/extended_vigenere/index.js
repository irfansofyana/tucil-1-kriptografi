// const encrypt = (plaintext, key) => {
//   let resultEncryption = "";
//   for (let i = 0; i < plaintext.length; ++i) {
//     const order =
//       (plaintext[i].charCodeAt(0) + key[i % key.length].charCodeAt(0)) % 256;
//     resultEncryption = resultEncryption + String.fromCharCode(order);
//   }

//   return resultEncryption;
// };

// const decrypt = (cipher, key) => {
//   let resultDecryption = "";
//   for (let i = 0; i < cipher.length; ++i) {
//     const order =
//       (cipher[i].charCodeAt(0) - key[i % key.length].charCodeAt(0) + 256) % 256;
//     resultDecryption = resultDecryption + String.fromCharCode(order);
//   }

//   return resultDecryption;
// };

const { mod, intListToText, textToIntList } = require("../helper");

/*
 * Returns the result the Vigenère encryption on the given text with the given key.
 */
exports.encrypt = (plaintext, key) => {
  const output = [];

  const kt = textToIntList(key);
  var pt = Object.values(plaintext);

  for (let i = 0; i < pt.length; i++) {
    const k = kt[i % kt.length] - 97;
    // if (i < 500) console.log(pt[i], k, mod(pt[i] + k, 256));

    output.push(mod(pt[i] + k, 256)); // Add 65 to make it upper case
  }

  return intListToText(output);
};

exports.decrypt = (cipher, key) => {
  const output = [];

  console.log(cipher);
  var ct = Object.values(cipher);
  console.log(ct);
  const kt = textToIntList(key);

  for (let i = 0; i < ct.length; i++) {
    const k = kt[i % kt.length] - 97;
    output.push(mod(ct[i] - k, 256)); // Add 65 to make it upper case

    // if (i < 500) console.log(mod(ct[i] - k, 256), k, ct[i]);
  }

  return intListToText(output);
};
