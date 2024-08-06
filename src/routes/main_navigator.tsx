import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {TDParamList} from './props';
import {TDHomeScreen} from '../features/home';

const Stack = createNativeStackNavigator<TDParamList>();

const TDAppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: 'TODO',
        }}>
        <Stack.Screen name="Home" component={TDHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default TDAppNavigator;
