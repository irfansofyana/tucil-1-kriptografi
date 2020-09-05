const swapString = (string, a, b) => {
    let arrString = string.split('');
    [arrString[a], arrString[b]] = [arrString[b], arrString[a]];
    return arrString.join('');
}

const shuffleString = (string) => {
    let array = string;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        array = swapString(array, i, j);
    }
    return array;
}

const randomKey = (plaintext) => {
    const randomKeyLen = Math.floor(Math.random() * plaintext.length()) + 1;
    let key = '';
    for (let i = 0; i< randomKeyLen; ++i) {
        const randomChar = String.fromCharCode('a'.charCodeAt() + Math.floor(Math.random() * 26));
        key = key + randomChar;
    }

    return key;
}

const generateMatrix = () => {
    let alphabet = ''
    for (let i = 0; i < 26; ++i) {
        alphabet = alphabet + (String.fromCharCode('A'.charCodeAt() + i));
    }

    let key = [];
    for (let i = 0; i < 26; ++i){
        const shuffledString = shuffleString(alphabet);
        key.push(shuffledString);
    }

    return key;
}

const findEncryptedChar = (matrix, char, key) => {
    let plainTextPosition = -1;
    for (let i = 0; i < 26 && plainTextPost === -1; ++i) {
        if (matrix[0][i] === char) {
            plainTextPosition = i;
        }
    }

    let keyPositiion = -1;
    for (let i = 0; i < 26 && keyPositiion === -1; ++i) {
        if (matrix[i][0] === key) {
            keyPositiion = i;
        }
    }

    return matrix[keyPositiion][plainTextPosition];
}

const findDecryptedChar = (matrix, char, key) => {
    let keyPosition = -1;
    for (let i = 0; i < 26 && keyPosition === -1; ++i) {
        if (matrix[i][0] === key) {
            keyPosition = i;
        }
    }

    let cipherposition = -1;
    for (let i = 0; i < 26 && cipherposition === -1; ++i) {
        if (matrix[keyPosition][i] === char) {
            cipherposition = i;
        }
    }

    return matrix[0][cipherposition];
}

module.exports = {
    randomKey,
    generateMatrix,
    findEncryptedChar,
    findDecryptedChar
}