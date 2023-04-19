# react-native-sutram

Spawn new react native JavaScript processes for CPU intensive work outside of your
main UI JavaScript process.

This isn't 'threading', but rather multi-processing. The main tradeoff of using this library is memory usage, as creating new JS processes can have significant overhead. Be sure to benchmark your app's memory usage and other resources before using this library. These benchmarks can be easily made using [Flashlight](https://github.com/bamlab/flashlight).

## Installation

```sh
npm install react-native-sutram
```
or
```sh
yarn add react-native-sutram
```

## Usage
In your application code (react components, etc.):

```js
import { Thread } from 'react-native-threads';

// start a new react native JS process
const thread = new Thread('path/to/thread.js');

// send a message, strings only
thread.postMessage('hello');

// listen for messages
thread.onmessage = (message) => console.log(message);

// stop the JS process
thread.terminate();
```

In your thread code (dedicated file such as `thread.js`):
```javascript
import { self } from 'react-native-threads';

// listen for messages
self.onmessage = (message) => {
}

// send a message, strings only
self.postMessage('hello');
```


## Thread Lifecycle

- Threads are paused when the app enters in the background
- Threads are resumed once the app is running in the foreground
- During development, when you reload the main JS bundle (shake device -> `Reload`) the threads are killed


## Debugging

Instantiating Threads creates multiple react native JS processes and can make debugging
remotely behave unpredictably. I recommend using a third party debugging tool like
[Reactotron](https://github.com/infinitered/reactotron) to aid with this. Each process,
including your main application as well as your thread code can connect to Reactotron
and log debugging messages.

## Building for Release

You will need to manually bundle your thread files for use in a production release
of your app.  This documentation assumes you have a single thread file called
`index.thread.js` in your project root.  If your file is named differently or in
a different location, you can update the documented commands accordingly.

**Note**: If your single thread file is in a different location, the folder structure needs to 
be replicated under `./ios` and `./android/app/src/main/assets/threads`.

```
./App/Workers/worker.thread.js => ./ios/App/Workers/worker.thread.jsbundle
./App/Workers/worker.thread.js => ./android/app/src/main/assets/threads/App/Workers/worker.thread.jsbundle
```

For iOS you can use the following command:

`node node_modules/react-native/local-cli/cli.js bundle --dev false --assets-dest ./ios --entry-file index.thread.js --platform ios --bundle-output ./ios/index.thread.jsbundle`

Once you have generated the bundle file in your ios folder, you will also need to add
the bundle file to you project in Xcode. In Xcode's file explorer you should see
a folder with the same name as your app, containing a `main.jsbundle` file as well
as an `appDelegate.m` file. Right click on that folder and select the 'Add Files to <Your App Name>'
option, which will open up finder and allow you to select your `ios/index.thread.jsbundle`
file. You will only need to do this once, and the file will be included in all future
builds.

For Android create this direactory
`mkdir ./android/app/src/main/assets/threads`

And then you can use the following command:

`node node_modules/react-native/local-cli/cli.js bundle --dev false --assets-dest ./android/app/src/main/res/ --entry-file index.thread.js --platform android --bundle-output ./android/app/src/main/assets/threads/index.thread.bundle`

For convenience I recommend adding these thread building commands as npm scripts
to your project.

## Example App
Included in this repository is a simple example application demonstrating basic
usage of react-native-threads. Look at `examples/SimpleExample/README.md` for
instructions on running it.  Here's how the app looks with the Reactotron debugger:

![SimpleExample Screen Capture](https://raw.githubusercontent.com/traviskn/react-native-threads/master/media/simplethreadexample.gif)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)


## Acknowledgements

This library was heavily inspired by three other packages two under the name of
`react-native-workers` and `react-native-threads`

The first was https://github.com/fabriciovergal/react-native-workers ,
and the second was https://github.com/devfd/react-native-workers
and the third, well this is a fork of it.













