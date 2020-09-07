const affine = require('../affine');
const helper = require('../affine/helper');

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
    plainTexts.forEach((plainText) => {
        let keyM = Math.floor(Math.random() * 51) + 1;
        while (helper.gcd(keyM, 52) !== 1) {
            keyM = Math.floor(Math.random() * 51) + 1;
        }
        const keyB = Math.floor(Math.random() * 51) + 1;

        const plain = plainText.replace(/[^a-zA-Z]/gi, '').trim();
        const encrypt = affine.encrypt(plain, keyM, keyB);
        const decrypt = affine.decrypt(encrypt, keyM, keyB);

        expect(decrypt).toBe(plain);
    });
});