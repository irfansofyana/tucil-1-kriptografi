const helper = require('./helper');

const encrypt = (plaintext, key, matrix) => {
    let resultEncryption = '';
    let j = 0;
    for (let i = 0; i < plaintext.length; ++i) {
        const cipher = helper.findEncryptedChar(matrix, plaintext[i], key[j]);
        resultEncryption = resultEncryption + cipher;
        j = (j + 1) % key.length;
    }

    return resultEncryption;
}

const decrypt = (cipher, key, matrix) => {
    let resultDecryption = '';
    let j = 0;
    for (let i = 0; i < cipher.length; ++i) {
        const plaintext = helper.findDecryptedChar(matrix, cipher[i], key[j]);
        resultDecryption = resultDecryption + plaintext;
        j = (j + 1) % key.length; 
    }

    return resultDecryption;
}   

module.exports = {
    encrypt,
    decrypt
}