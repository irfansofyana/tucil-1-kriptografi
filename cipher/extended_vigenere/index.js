const encrypt = (plaintext, key) => {
    let resultEncryption = '';
    for (let i = 0; i < plaintext.length; ++i) {
        const order = (plaintext[i].charCodeAt(0) + key[i%key.length].charCodeAt(0)) % 256;
        resultEncryption = resultEncryption + String.fromCharCode(order);
    }

    return resultEncryption;
}

const decrypt = (cipher, key) => {
    let resultDecryption = '';
    for (let i = 0; i < cipher.length; ++i) {
        const order = (cipher[i].charCodeAt(0) - key[i%key.length].charCodeAt(0) + 256) % 256;
        resultDecryption = resultDecryption + String.fromCharCode(order);
    }

    return resultDecryption;
}

module.exports = {
    encrypt,
    decrypt
}