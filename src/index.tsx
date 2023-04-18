import { NativeModules, Platform } from 'react-native';

export { default as self } from './js/self';
export { default as Thread } from './js/Thread';

const LINKING_ERROR =
  `The package 'react-native-sutram' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Sutram = NativeModules.Sutram
  ? NativeModules.Sutram
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return Sutram.multiply(a, b);
}
