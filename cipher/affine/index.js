const helper = require('./helper');

const MAX_BLOCK = 26;

const encrypt = (plaintext, keyM, keyB) => {
    if (helper.gcd(keyM, MAX_BLOCK) != 1) {
        return new Error(`Can't use ${keyM} as the key!`);
    }
    plaintext = plaintext.replace(/[^a-zA-Z]/gi, '').trim();
    
    let resultEncrypt = '';
    for (let i = 0; i < plaintext.length; ++i) {
        const encryptNum = helper.add(
            helper.multiply(
                keyM,
                parseInt(helper.wordToNum(plaintext[i])),
                MAX_BLOCK
            ),
            keyB,
            MAX_BLOCK
        );

        resultEncrypt = resultEncrypt + helper.numToWord(encryptNum).toUpperCase();
    } 
    return resultEncrypt;
}

const decrypt = (cipher, keyM, keyB) => {
    if (helper.gcd(keyM, MAX_BLOCK) != 1) {
        return new Error(`Can't use ${keyM} as the key!`);
    }

    let resultDecrypt = '';
    for (let i = 0; i < cipher.length; ++i) {
        const decryptNum = helper.multiply(
            helper.inverse(keyM, MAX_BLOCK),
            helper.minus(parseInt(helper.wordToNum(cipher[i])), keyB, MAX_BLOCK),
            MAX_BLOCK
        );
        
        resultDecrypt = resultDecrypt + helper.numToWord(decryptNum);
    }

    return resultDecrypt;
}

module.exports = {
    encrypt,
    decrypt
}