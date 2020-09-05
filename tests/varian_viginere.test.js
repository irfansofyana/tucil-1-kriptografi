const full_virgenere = require('../varian_vigenere/full_vigenere');
const helper = require('../varian_vigenere/helper');

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

test('The encryption and decription should be success', () => {
    const matrix = helper.generateMatrix();
    plainTexts.forEach((plainText) => {
        const randomKey = helper.randomKey(plainText);
        const encrypt = full_virgenere.encrypt(plainText, randomKey, matrix);
        const decrypt = full_virgenere.decrypt(encrypt, randomKey, matrix);

        expect(decrypt).toBe(plainText);
    });
});