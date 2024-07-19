import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {AppRoutes} from './Navigation';
import {theme} from '@/components/theme';
import Login from '@/screens/login';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import Signup from '@/screens/signup';
import Otp from '@/screens/otp';

const Stack = createStackNavigator<AppRoutes>();
const LoginScreens = [{Login}, {Signup}, {Otp}];

export type TScreens = keyof (typeof LoginScreens)[0];

const ApplicationNavigator = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <ThemeProvider {...{theme}}>
          <StatusBar
            animated={true}
            barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
          />
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {LoginScreens.map(item => {
              const [name, component] = Object.entries(item)[0] as [
                TScreens,
                () => JSX.Element,
              ];
              return (
                <Stack.Screen key={name} name={name} component={component} />
              );
            })}
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

export default ApplicationNavigator;
