const full_vigenere = require('../cipher/varian_vigenere/full_vigenere');
const auto_key_vigenere = require('../cipher/varian_vigenere/auto_key_vigenere');
const helper = require('../cipher/varian_vigenere/helper');

const plainTexts = [
    'irfansofyanaputra',
    'juniardiakbar',
    'initucilgais',
    'initucilrasatubes',
    'kriptografi',
    'pakrinaldimunir',
    'algoritmanyabanyaksekali',
    'tugasnyahanyasatuminggu'
];

test('The encryption and decription using full vigenere should be successful', () => {
    const matrix = helper.generateMatrix();
    plainTexts.forEach((plainText) => {
        const randomKey = helper.randomKey(plainText);
        const encrypt = full_vigenere.encrypt(plainText, randomKey, matrix);
        const decrypt = full_vigenere.decrypt(encrypt, randomKey, matrix);

        expect(decrypt).toBe(plainText);
    });
});

test('The encryption and decription using auto key vigenere should be successful', () => {
    plainTexts.forEach((plainText) => {
        const randomKey = helper.completeAutoKey(helper.randomKey(plainText), plainText);
        const encrypt = auto_key_vigenere.encrypt(plainText, randomKey);
        const decrypt = auto_key_vigenere.decrypt(encrypt, randomKey);

        expect(decrypt).toBe(plainText);
    });
});