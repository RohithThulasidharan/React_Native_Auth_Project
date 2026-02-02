import { DefaultTheme } from '@react-navigation/native';

import { Navigation } from './src/navigation/navigation';
import { AuthProvider } from './src/context/auth/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return <SafeAreaProvider>
    <AuthProvider>
      <Navigation theme={MyTheme} />
    </AuthProvider>
  </SafeAreaProvider>
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)',
    primary: 'rgb(28, 37, 197)',
  },
};

export default App;
