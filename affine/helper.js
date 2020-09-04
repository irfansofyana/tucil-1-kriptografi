const multiply = (a, b, mod) => {
    return ((a % mod) * (b % mod)) % mod;
}

const add = (a, b, mod) => {
    return ((a % mod) + (b % mod)) % mod;
}

const minus = (a, b, mod) => {
    return ((a % mod) - (b % mod) + mod) % mod;
}

const power = (a, b, mod) => {
    let res = 1;

    while (b > 0) {
        if (b % 2 == 1) {
            res = multiply(res, a, mod);
        }
        a = multiply(a, a, mod);

        b = Math.floor(b / 2);
    }

    return res;
}

const gcd = (a, b) => {
    return (b === 0 ? a : gcd(b, a % b));
}

const inverse = (a, mod) => {
    a = a % mod;
    for (let i = 1; i < mod; ++i) {
        if (multiply(a, i, mod) === 1) {
            return i;
        }
    }
    return -1;
}


const wordToNum = (word) => {
    let num = '';
    for (let i = 0; i < word.length; ++i) {
        let order = word[i].toLowerCase().charCodeAt(0) - 'a'.charCodeAt();
        if (word[i] === word[i].toUpperCase()) {
            order += 26;
        }
        num = num + (order < 10 ? '0'.concat(order.toString()) : order.toString());
    }
    return num;
}

const numToWord = (num) => {
    let word = '';
    for (let i = 0; i < num.length; i += 2) {
        let order = parseInt(num.substr(i, 2), 10);
        if (order > 25) {
            word = word + String.fromCharCode('A'.charCodeAt() + order - 26);
        } else {
            word = word + String.fromCharCode('a'.charCodeAt() + order);
        }
    }

    return word;
}

module.exports = {
    multiply,
    add,
    minus,
    power,
    inverse,
    gcd,
    wordToNum,
    numToWord
}