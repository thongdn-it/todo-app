import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {TDParamList} from './props';
import {TDHomeScreen} from '../features/home';
import {TDCreateTaskScreen} from '../features/task';
import {tdTheme} from '../constants/themes';

const Stack = createNativeStackNavigator<TDParamList>();

const TDAppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: tdTheme.colors.primary[600],
          },
          headerTintColor: tdTheme.colors.white,
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="Home"
          options={{title: 'Tasks'}}
          component={TDHomeScreen}
        />
        <Stack.Screen
          name="CreateTask"
          options={{title: 'Create New Task'}}
          component={TDCreateTaskScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default TDAppNavigator;
