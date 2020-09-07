const enigma = require('../enigma');

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
        const key = 'isp';
        const config = 'klm';

        const encrypt = enigma.encrypt(plainText, key, config);
        const decrypt = enigma.decrypt(encrypt, key, config);
        
        expect(decrypt).toBe(plainText);
    });
});