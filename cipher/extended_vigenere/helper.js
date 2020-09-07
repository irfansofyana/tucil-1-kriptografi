const seedrandom = require('seedrandom');
const rng = seedrandom('this_is_seed');

const completeAutoKeyStandard = (key, plaintext) => {
    let newKey = key;
    for (let i = 0; i < plaintext.length - key.length; ++i) {
        newKey = newKey + key[i];
    }

    return newKey;
}

const randomKey = (plaintext) => {
    const randomKeyLen = Math.floor(rng() * plaintext.length) + 1;
    let key = '';
    for (let i = 0; i< randomKeyLen; ++i) {
        const randomChar = String.fromCharCode(Math.floor(rng() * 256));
        key = key + randomChar;
    }

    return key;
}

module.exports = {
    completeAutoKeyStandard,
    randomKey
}