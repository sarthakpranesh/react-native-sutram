/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Button, Text, View} from 'react-native';
import {Thread} from 'react-native-threads';
import badFibo from './badFibo';

function App(): JSX.Element {
  const threadRef = React.useRef<any>(null);
  const [fibo, setFibo] = React.useState<any>(0);
  const [fibo2, setFibo2] = React.useState<any>(0);

  React.useEffect(() => {
    if (threadRef.current === null) {
      threadRef.current = new Thread('./thread.js');
      threadRef.current.onmessage = (f: string) => {
        setFibo(Number(f));
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
        }}>
        <Text style={{marginBottom: 28, fontWeight: 'bold', fontSize: 28}}>
          Bad Fibonacci
        </Text>
        <Text>{fibo}</Text>
        <Button
          title="Fibonacci in Thread"
          onPress={() => {
            setFibo('...');
            if (threadRef.current?.postMessage) {
              threadRef.current.postMessage('1000');
            }
          }}
        />
        <Text style={{marginTop: 28}}>{fibo2}</Text>
        <Button
          title="Fibonacci in Main JS"
          onPress={() => {
            setFibo2('...');
            setFibo2(badFibo(1000));
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default App;
