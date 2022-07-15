import React from 'react';
import { createStackNavigator, } from '@react-navigation/stack';

import { InformasiStatus, DetailStatus } from '../screens';

export type RootStackParamList = {
    InformasiStatus: undefined,
    DetailStatus: {
        status: string,
        color: string,
    }
}

const Stack = createStackNavigator<RootStackParamList>();

const StatusMerapiNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName='InformasiStatus'
            screenOptions={{
                headerShown: false,
                gestureEnabled: true
            }}
        >
            <Stack.Screen
                name="InformasiStatus"
                component={InformasiStatus}

            />
            <Stack.Screen
                name="DetailStatus"
                component={DetailStatus}
            />
        </Stack.Navigator>
    )
}

export default StatusMerapiNavigation