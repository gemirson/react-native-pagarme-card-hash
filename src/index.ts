import axios from 'axios';
import qs from 'qs';
import { RSA } from 'react-native-rsa-native';

interface CardHashKey {
  id: number;
  publicKey: string;
}

interface Card {
  number: string;
  holderName: string;
  expirationDate: string;
  cvv: string;
}

async function requestCardHashKey(encryptionKey: string): Promise<CardHashKey> {
  const {
    data: { id, public_key: publicKey },
  } = await axios.get('https://api.pagar.me/1/transactions/card_hash_key', {
    params: { encryption_key: encryptionKey },
  });

  return {
    id,
    publicKey,
  };
}

function generateQueryString(card: Card) {
  return qs.stringify({
    card_number: card.number.replace(/[^0-9]/g, ''),
    card_holder_name: card.holderName,
    card_expiration_date: card.expirationDate.replace(/[^0-9]/g, ''),
    card_cvv: card.cvv.replace(/[^0-9]/g, ''),
  });
}

async function generateCardHash(
  card: Card,
  encryptionKey: string
): Promise<string> {
  const cardHashKey = await requestCardHashKey(encryptionKey);
  const queryString = generateQueryString(card);
  const encrypted = await RSA.encrypt(queryString, cardHashKey.publicKey);

  return `${cardHashKey.id}_${encrypted}`;
}

export default generateCardHash;
