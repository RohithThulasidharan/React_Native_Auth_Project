import { DefaultTheme } from '@react-navigation/native';
import { Navigation } from './src/config/navigation';
import { useLoadApp } from './src/hooks/useLoadApp';
import { SplashScreen } from './src/screens/SplashScreen';

function App() {
  const { isLoading, isLoggedIn } = useLoadApp();

  if (isLoading) {
    return (
      <SplashScreen />
    );
  }

  return <Navigation theme={MyTheme} />
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
