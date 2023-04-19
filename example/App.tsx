/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView, Button, Text, View } from 'react-native';
import { Thread } from 'react-native-sutram';
import badFibo from './badFibo';
import veryLargeData from './veryLargeData.json';

function App(): JSX.Element {
  const threadRefFibo = React.useRef<any>(null);
  const threadRefLarge = React.useRef<any>(null);
  const [fibo, setFibo] = React.useState<any>(0);
  const [fibo2, setFibo2] = React.useState<any>(0);
  const [large, setLarge] = React.useState<number>(0);

  React.useEffect(() => {
    if (threadRefFibo.current === null) {
      threadRefFibo.current = new Thread('./thread.js');
      threadRefFibo.current.onmessage = (f: string) => {
        setFibo(Number(f));
      };
    }
    if (threadRefLarge.current === null) {
      threadRefLarge.current = new Thread('./threadLarge.js');
      threadRefLarge.current.onmessage = (f: string) => {
        setLarge((n) => Number(f) - n);
      };
    }
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Text style={{ marginBottom: 28, fontWeight: 'bold', fontSize: 28 }}>
          Bad Fibonacci
        </Text>
        <Text>{fibo}</Text>
        <Button
          title="Fibonacci in Thread"
          onPress={() => {
            setFibo('...');
            if (threadRefFibo.current?.postMessage) {
              threadRefFibo.current.postMessage('1000');
            }
          }}
        />
        <Text style={{ marginTop: 28 }}>{fibo2}</Text>
        <Button
          title="Fibonacci in Main JS"
          onPress={() => {
            setFibo2('...');
            setFibo2(badFibo(1000));
          }}
        />
        <Text style={{ marginTop: 28 }}>{large}ms</Text>
        <Button
          title="Send Large Data To Thread"
          onPress={() => {
            if (threadRefLarge.current?.postMessage) {
              threadRefLarge.current.postMessage(JSON.stringify(veryLargeData));
              setLarge(Date.now());
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default App;
