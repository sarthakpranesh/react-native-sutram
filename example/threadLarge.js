import { self } from 'react-native-sutram';

self.onmessage = (message) => {
  self.postMessage(`${Date.now()}`);
};
