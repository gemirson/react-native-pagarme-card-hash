import generateCardHash from '../';

jest.mock('react-native-rsa-native', () => {
  const RSA = jest.fn();

  // @ts-ignore
  RSA.encrypt = jest.fn((queryString) => queryString);

  return { RSA };
});

jest.mock('axios', () => {
  return {
    get: jest.fn(() => ({ data: { id: 777, public_key: 'Lorem ipsum' } })),
  };
});

it('should generate card_hash', async () => {
  const hash = await generateCardHash(
    {
      number: '5315084062046316',
      holderName: 'John Doe',
      expirationDate: '0921',
      cvv: '560',
    },
    'foo'
  );

  expect(hash).toStrictEqual(
    '777_card_number=5315084062046316&card_holder_name=John%20Doe&card_expiration_date=0921&card_cvv=560'
  );
});

it('should generate card_hash if card fields have special characters', async () => {
  const hash = await generateCardHash(
    {
      number: '5315 0840 6204 6316',
      holderName: 'John Doe',
      expirationDate: '09/21',
      cvv: '560',
    },
    'foo'
  );

  expect(hash).toStrictEqual(
    '777_card_number=5315084062046316&card_holder_name=John%20Doe&card_expiration_date=0921&card_cvv=560'
  );
});
