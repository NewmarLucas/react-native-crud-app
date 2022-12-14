import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './views/Welcome';
import Details from './views/Details';
import Update from './views/Update';
import Create from './views/Create';

const Stack = createNativeStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName='Welcome'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Welcome' component={Welcome} />
      <Stack.Screen name='Details' component={Details} />
      <Stack.Screen name='Update' component={Update} />
      <Stack.Screen name='Create' component={Create} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
