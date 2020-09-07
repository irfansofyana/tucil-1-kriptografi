const enigma = require('../cipher/enigma');

const plainTexts = [
    'irfansofyanaputra',
    'juniardiakbar',
    'testenigmadong',
    'inialgoritmaenigma',
    'enigmasepertiangkatan2015',
    'semogalolostestnya',
    'aaaaaaakujatuhcintakepadamutolongberikancintamupadaku',
    'semoganilaikriptografinyabagussehinggakubisawisudajuli'
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