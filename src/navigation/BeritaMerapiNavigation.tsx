import React from 'react';
import { createStackNavigator, } from '@react-navigation/stack';

import { BeritaMerapi as BeritaMerapiScreen, TambahBeritaMerapi as TambahBeritaMerapiScreen } from '../screens';

export type RootStackParamList = {
    BeritaMerapi: undefined,
    TambahBeritaMerapi: undefined,
}

const Stack = createStackNavigator<RootStackParamList>();

const StatusMerapiNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName='BeritaMerapi'
            screenOptions={{
                headerShown: false,
                gestureEnabled: true
            }}
        >
            <Stack.Screen
                name="BeritaMerapi"
                component={BeritaMerapiScreen}
            />
            <Stack.Screen
                name="TambahBeritaMerapi"
                component={TambahBeritaMerapiScreen}
            />

        </Stack.Navigator>
    )
}

export default StatusMerapiNavigation