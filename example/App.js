import * as React from 'react';
import {Button, Text, View} from 'react-native';
import generateCardHash from 'react-native-pagarme-hash';

export default function App() {
  const [cardHash, setCardHash] = React.useState('');

  async function generateHash() {
    const hash = await generateCardHash(
      {
        number: '5315084062046316',
        holderName: 'John Doe',
        expirationDate: '0921',
        cvv: '560',
      },
      '<your encryption key>',
    );

    setCardHash(hash);
  }

  return (
    <View>
      <Button title="Generate card_hash" onPress={generateHash} />
      <Text>{cardHash}</Text>
    </View>
  );
}
