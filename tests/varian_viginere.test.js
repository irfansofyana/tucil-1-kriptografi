const full_virgenere = require('../varian_virgenere/full_vigenere');
const helper = require('../varian_virgenere/helper');

const plainTexts = [
    'irfansofyanaputra',
    'juniardiakbar',
    'iniTuCiLKripTografi',
    'iniTuCilRasaTubes',
    'Kriptografi2020',
    'PakRINALDIMUNIR',
    'Ini tucil seperti Tubes Ya?'
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