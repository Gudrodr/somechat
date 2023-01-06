import React, { useEffect, useReducer } from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Chat } from './src/components/Chat/Chat';
import { useConnection } from './src/connection/connection';
import { Sidebar } from './src/components/Sidebar/Sidebar';
import { initialState, reducer } from './src/reducer/reducer';
import { Settings } from './src/components/Settings/Settings';


const App = () => {
  const conn = useConnection();
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { width, height } = useWindowDimensions();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    height,
  };

  useEffect(() => {
    conn.subscribe({
      next: (event) => dispatch(event),
    });

    return () => conn.unsubscribe();
  }, []);

  return (  
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{
        flexDirection: 'row',
        height: '100%'
      }}>
        <Sidebar state={state} dispatch={dispatch} />
        {state.view === 'main'
          ? <Chat messages={state.messages} />
          : <Settings state={state} dispatch={dispatch} />
        }
      </View>
    </SafeAreaView>
  );
};

export default App;