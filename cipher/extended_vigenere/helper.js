const completeAutoKeyStandard = (key, plaintext) => {
    let newKey = key;
    for (let i = 0; i < plaintext.length - key.length; ++i) {
        newKey = newKey + key[i];
    }

    return newKey;
}

const randomKey = (plaintext) => {
    const randomKeyLen = Math.floor(Math.random() * plaintext.length) + 1;
    let key = '';
    for (let i = 0; i< randomKeyLen; ++i) {
        const randomChar = String.fromCharCode(Math.floor(Math.random() * 256));
        key = key + randomChar;
    }

    return key;
}

module.exports = {
    completeAutoKeyStandard,
    randomKey
}