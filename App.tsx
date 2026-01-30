import { DefaultTheme } from '@react-navigation/native';

import { Navigation } from './src/navigation/navigation';
import { useAuthCheck } from './src/hooks/useLoadApp';
import { AuthProvider } from './src/context/auth/AuthContext';

function App() {
  const { isLoading, isLoggedIn } = useAuthCheck();

  return <AuthProvider>
    <Navigation theme={MyTheme} />
  </AuthProvider>
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(140, 201, 125)',
    primary: 'rgb(255, 45, 85)',
  },
};

export default App;
