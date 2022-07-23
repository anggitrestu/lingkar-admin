import React from 'react';
import { createStackNavigator, } from '@react-navigation/stack';

import { KontakDarurat, UpdateKontakDarurat } from '../screens';

export type RootStackParamList = {
    KontakDarurat: undefined,
    UpdateKontakDarurat: {
        idEdit: boolean,
        data: {
            key: string,
            dukuh: string,
            nama: string,
            no_hp: string,
            keterangan: string,
            dukuh_sebelumnya: string,
        }
    }
}

const Stack = createStackNavigator<RootStackParamList>();

const KontakDaruratNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName='KontakDarurat'
            screenOptions={{
                headerShown: false,
                gestureEnabled: true
            }}
        >
            <Stack.Screen
                name="KontakDarurat"
                component={KontakDarurat}
            />
            <Stack.Screen
                name="UpdateKontakDarurat"
                component={UpdateKontakDarurat}
            />

        </Stack.Navigator>
    )
}

export default KontakDaruratNavigation