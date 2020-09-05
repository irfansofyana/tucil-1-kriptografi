const extended_vigenere = require('../extended_vigenere');
const helper = require('../extended_vigenere/helper');

const plainTexts = [
    'irfansofyanaputra',
    'juniardiakbar',
    'initucilgais',
    'initucilrasatubes',
    'kriptografi',
    'pakrinaldimunir',
    'algoritmanyabanyaksekali',
    'tugasnyahanyasatuminggu',
    '4ku5uk4k12ipt0grafi',
    'ApaK4hK4muBi5aB4CaIni?',
    'InsTITutT3kNoL06IB4nDuNG',
    '53mo6aNiL4iTuC1lNy4B4gU5'
];

test('The encryption and decription using extended vigenere should be successful', () => {
    plainTexts.forEach((plainText) => {
        const randomKey = helper.completeAutoKeyStandard(helper.randomKey(plainText), plainText);
        const encrypt = extended_vigenere.encrypt(plainText, randomKey);
        const decrypt = extended_vigenere.decrypt(encrypt, randomKey);

        expect(decrypt).toBe(plainText);
    });
});