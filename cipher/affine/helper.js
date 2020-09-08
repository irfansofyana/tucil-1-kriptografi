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
    if (word >= 'A' && word <= 'Z') {
        return word.charCodeAt(0) - 'A'.charCodeAt(0);
    } else if (word >= 'a' && word <= 'z') {
        return word.charCodeAt(0) - 'a'.charCodeAt(0);
    }
}

const numToWord = (num) => {
    return String.fromCharCode('a'.charCodeAt(0) + num);
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