import React from 'react';
import { createStackNavigator, } from '@react-navigation/stack';

import { InformasiStatus, DetailStatus } from '../screens';
import TambahDetailStatus from '../screens/DetailStatus/TambahDetailStatus';

export type RootStackParamList = {
    InformasiStatus: undefined,
    DetailStatus: {
        status: string,
        color: string,
    },
    TambahDetailStatus: {
        status: string,
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
            <Stack.Screen
                name="TambahDetailStatus"
                component={TambahDetailStatus}
            />
        </Stack.Navigator>
    )
}

export default StatusMerapiNavigation