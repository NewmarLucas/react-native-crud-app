import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './views/Welcome';

const Stack = createNativeStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName='Welcome'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Welcome' component={Welcome} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
