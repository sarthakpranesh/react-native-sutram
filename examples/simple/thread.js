import { self } from 'react-native-threads';
import badFibo from './badFibo';

self.onmessage = message => {
  self.postMessage(`${badFibo(Number(message))}`);
}
