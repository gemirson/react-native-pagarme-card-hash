# react-native-pagarme-card-hash

React Native module for generating pagar.me card hashes

## Support

Only tested on Android, but it should work on iOS.

## Installation

```sh
yarn add react-native-rsa-native react-native-pagarme-card-hash
```

## Usage

```js
import generateCardHash from 'react-native-pagarme-card-hash';

// ...

const hash = await generateCardHash(
    {
        number: '5315084062046316',
        holderName: 'John Doe',
        expirationDate: '0921',
        cvv: '560',
    },
    '<your encryption key>'
);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
