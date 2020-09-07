const helper = require('./helper');

class Rotors {
    constructor(key) {
        const keyConverted = key.split(' ');
        
        this._counter = [0, 0, 0];

        this._rotor = new Array(3);
        for (let i = 0; i < 3; ++i) {
            this._rotor[i] = new Array(2);
            for (let j = 0; j < 2; ++j) {
                this._rotor[i][j] = new Array(26);
                if (j === 0) {
                    //left part of a rotor
                    let curr = parseInt(keyConverted[i], 10);
                    for (let k = 0; k < 26; ++k) {
                        if (curr == 27) curr = 1;
                        this._rotor[i][j][k] = curr;
                        curr++;
                    }
                } else {
                    // right part of a rotor
                    this._rotor[i][j] = helper.randomAlphabetOrder();
                }
            }
        }
    }

    get counter() {
        return this._counter;
    }

    get rotor() {
        return this._rotor;
    }


    set rotor(key, config) {
        const keyConverted = key.split(' ');
        const configConverted = config.split(' ');

        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 2; ++j) {
                let curr = (j === 0 ? parseInt(keyConverted[i], 10) : parseInt(configConverted[i]))
                for (let k = 0; k < 26; ++k) {
                    if (curr == 27) curr = 1;
                    this._rotor[i][j][k] = curr;
                    curr++;
                }
            }
        }      
    }

    forwardRotor(indexRotor) {
        for (let i = 0; i < 2; ++i) {
            let tmp = this._rotor[indexRotor][i];
            this._rotor[indexRotor][i] = [tmp[tmp.length-1], ...tmp.slice(0, tmp.length-1)]
        }
    }

    slideRotors(indexRotor) {
        if (indexRotor >= 0) {
            this._counter[indexRotor]++;
            this.forwardRotor(indexRotor);

            if (this._counter[indexRotor] === 26) {
                this._counter[indexRotor] = 0;
                this.slideRotors(indexRotor-1);
            }
        }
    }

    findEncryptedChar(char) {
        let leftPointer = this._rotor[0][0][char.charCodeAt() - 'a'.charCodeAt()];
        let rightPointer = 0;

        for (let i = 1; i < 4; ++i) {
            rightPointer = helper.findPosition(this._rotor[i-1][1], leftPointer);
            if (i < 3) leftPointer = this._rotor[i][0][rightPointer];
        }

        return String.fromCharCode('A'.charCodeAt() + rightPointer);
    }

    findDecryptedChar(char) {
        let rightPointer = this._rotor[2][1][char.charCodeAt() - 'a'.charCodeAt()];
        let leftPointer = 0;

        for (let i = 2; i >= 0; --i) {
            leftPointer = helper.findPosition(this._rotor[i][0], rightPointer);
            if (i >= 1) rightPointer = this._rotor[i-1][1][leftPointer];
        }

        return String.fromCharCode('A'.charCodeAt() + leftPointer);
    }
}

const encrypt = (plaintext, key, config) => {
    let rotors = new Rotors(key);
    if (config.length > 0) rotors.rotor(config);

    let resultEncryption = '';

    for (let i = 0; i < plaintext.length; ++i) {
        resultEncryption = resultEncryption +  rotors.findEncryptedChar(plaintext[i]);
        rotors.slideRotors();
    }

    return resultEncryption;
}

const decrypt = (cipher, key, config) => {
    let rotors = new Rotors(key);
    if (config.length > 0) rotors.rotor(config);

    let resultDecryption = '';
    
    for (let i = 0; i < cipher.length; ++i) {
        resultDecryption = resultDecryption + rotors.findDecryptedChar(plaintext[i]);
        rotors.slideRotors();
    }

    return resultDecryption;
}

module.exports = {
    encrypt,
    decrypt
}