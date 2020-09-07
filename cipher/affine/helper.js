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
    let order = word.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
    if (word === word.toUpperCase()) {
        order += 26;
    }
    num = (order < 10 ? '0'.concat(order.toString()) : order.toString());
    return num;
}

const numToWord = (num) => {
    let order = parseInt(num, 10);
    if (order > 25) {
        return String.fromCharCode('A'.charCodeAt() + order - 26);
    } else {
        return String.fromCharCode('a'.charCodeAt() + order);
    }
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