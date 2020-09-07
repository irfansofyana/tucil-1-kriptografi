const helper = require('./helper');

const encrypt = (plaintext, key) => {
    let resultEncryption = '';
    let keyIndex = 0, plaintextIdx = 0;
    for (let i = 0; i < plaintext.length; ++i){
        let charKey = '';
        if (keyIndex >= key.length) {
            charKey = plaintext[plaintextIdx];
            plaintextIdx++;
        } else {
            charKey = key[keyIndex];
            keyIndex++;
        }

        const order = (helper.findAlphabetOrder(plaintext[i]) + helper.findAlphabetOrder(charKey)) % 26;
        resultEncryption = resultEncryption + helper.findAlphabetUppercase(order);
    }

    return resultEncryption;
}

const decrypt = (cipher, key) => {
    let resultDecryption = '';
    let keyIndex = 0, cipherIdx = 0;

    for (let i = 0; i < cipher.length; ++i){
        let charKey = '';
        if (keyIndex >= key.length) {
            charKey = cipher[cipherIdx];
            cipherIdx++;
        } else {
            charKey = key[keyIndex];
            keyIndex++;
        }
        const order = (helper.findAlphabetOrder(cipher[i]) - helper.findAlphabetOrder(charKey) + 26) % 26;

        resultDecryption = resultDecryption + helper.findAlphabetLowerCase(order);
    }

    return resultDecryption;
}

module.exports = {
    encrypt,
    decrypt
}