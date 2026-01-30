import { DefaultTheme } from '@react-navigation/native';

import { Navigation } from './src/navigation/navigation';
import { AuthProvider } from './src/context/auth/AuthContext';

function App() {
  return <AuthProvider>
    <Navigation theme={MyTheme} />
  </AuthProvider>
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(140, 201, 125)',
    primary: 'rgb(28, 37, 197)',
  },
};

export default App;
