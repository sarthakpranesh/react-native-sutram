import { self } from 'react-native-sutram';
import badFibo from './badFibo';

self.onmessage = (message) => {
  self.postMessage(`${badFibo(Number(message))}`);
};
