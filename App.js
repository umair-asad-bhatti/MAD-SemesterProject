import React, { useEffect } from 'react';
import NavigationService from './services/navigation_service/navigation_service';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as NavigationBar from 'expo-navigation-bar';
import Loading from './components/Loading';
export default function App() {

  const [fontsLoaded] = useFonts({
    'eczar-regular': require('./assets/fonts/Eczar-Regular.ttf'),
    'eczar-bold': require('./assets/fonts/Eczar-Bold.ttf'),
    'roboto-condensed-light': require('./assets/fonts/RobotoCondensed-Light.ttf'),
    'roboto-condensed-regular': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
    'roboto-condensed-medium': require('./assets/fonts/RobotoCondensed-Medium.ttf'),
    'roboto-condensed-bold': require('./assets/fonts/RobotoCondensed-Bold.ttf'),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      try {
        NavigationBar.setBackgroundColorAsync("red");
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    };

    if (fontsLoaded) {
      hideSplashScreen()
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Loading />; // or render a custom loading screen
  }
  return (
    <NavigationService />
  );
}
